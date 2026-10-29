<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

function positiveIntegerParameter(string $name, int $default): ?int
{
    $value = filter_input(INPUT_GET, $name, FILTER_VALIDATE_INT);
    if ($value === false || ($value !== null && $value < 1)) {
        return null;
    }

    return $value ?? $default;
}

function bindQueryParameters(mysqli_stmt $statement, string $types, array &$values): void
{
    if ($types === "") {
        return;
    }

    $parameters = [$types];
    foreach ($values as &$value) {
        $parameters[] = &$value;
    }

    call_user_func_array([$statement, "bind_param"], $parameters);
}

$page = positiveIntegerParameter("page", 1);
$pageSize = positiveIntegerParameter("pageSize", 10);
$sucursalId = filter_input(INPUT_GET, "sucursal_id", FILTER_VALIDATE_INT);
$clienteId = filter_input(INPUT_GET, "cliente_id", FILTER_VALIDATE_INT);
$month = filter_input(INPUT_GET, "mes", FILTER_UNSAFE_RAW);
$status = filter_input(INPUT_GET, "estado", FILTER_UNSAFE_RAW);

if (
    $page === null ||
    $pageSize === null ||
    ($sucursalId !== null && ($sucursalId === false || $sucursalId < 1)) ||
    ($clienteId !== null && ($clienteId === false || $clienteId < 1))
) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid pagination or filter parameter."]);
    exit;
}

if ($month !== null && $month !== "" && !preg_match('/^\d{4}-(0[1-9]|1[0-2])$/', $month)) {
    http_response_code(400);
    echo json_encode(["error" => "mes must use the YYYY-MM format."]);
    exit;
}

if ($status !== null && $status !== "" && !in_array($status, ["Pagada", "Pendiente", "Atrasada"], true)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid invoice status."]);
    exit;
}

$pageSize = min($pageSize, 100);
$conditions = [];
$parameters = [];
$parameterTypes = "";

if ($sucursalId !== null) {
    $conditions[] = "sucursal_id = ?";
    $parameters[] = $sucursalId;
    $parameterTypes .= "i";
}

if ($clienteId !== null) {
    $conditions[] = "cliente_id = ?";
    $parameters[] = $clienteId;
    $parameterTypes .= "i";
}

if ($month !== null && $month !== "") {
    $monthStart = DateTimeImmutable::createFromFormat("!Y-m", $month);
    $conditions[] = "fecha >= ? AND fecha < ?";
    $parameters[] = $monthStart->format("Y-m-d");
    $parameters[] = $monthStart->modify("+1 month")->format("Y-m-d");
    $parameterTypes .= "ss";
}

if ($status !== null && $status !== "") {
    $conditions[] = "estado = ?";
    $parameters[] = $status;
    $parameterTypes .= "s";
}

$whereClause = $conditions ? " WHERE " . implode(" AND ", $conditions) : "";

try {
    ob_start();
    require_once "conexion2.php";
    ob_end_clean();
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $connection = db_connect();

    $countStatement = mysqli_prepare($connection, "SELECT COUNT(*) AS total FROM factura" . $whereClause);
    $countParameters = $parameters;
    bindQueryParameters($countStatement, $parameterTypes, $countParameters);
    mysqli_stmt_execute($countStatement);
    $countResult = mysqli_stmt_get_result($countStatement);
    $total = (int) mysqli_fetch_assoc($countResult)["total"];
    mysqli_stmt_close($countStatement);

    $totalPages = (int) ceil($total / $pageSize);
    $data = [];

    if ($page <= $totalPages) {
        $offset = ($page - 1) * $pageSize;
        $statement = mysqli_prepare(
            $connection,
            "SELECT ID_factura, fecha, sucursal_id, cliente_id, importe, iva, estado
             FROM factura" . $whereClause . "
             ORDER BY ID_factura DESC
             LIMIT ? OFFSET ?"
        );
        $queryParameters = array_merge($parameters, [$pageSize, $offset]);
        bindQueryParameters($statement, $parameterTypes . "ii", $queryParameters);
        mysqli_stmt_execute($statement);
        $result = mysqli_stmt_get_result($statement);
        $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
        mysqli_stmt_close($statement);
    }

    mysqli_close($connection);

    echo json_encode([
        "data" => $data,
        "total" => $total,
        "page" => $page,
        "pageSize" => $pageSize,
        "totalPages" => $totalPages
    ]);
} catch (Throwable $error) {
    error_log("Get_facturas.php: " . $error->getMessage());
    http_response_code(500);
    echo json_encode(["error" => "No se pudieron recuperar las facturas."]);
}
?>
