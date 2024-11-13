<?php
/*
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 */

namespace connector;

use Exception;
use PDO;
use PDOException;

class PostgreSQL
{
    private PDO $pdo;

    public function __construct(string $configFile = __DIR__ . '/pg_settings.json') {
        $config = $this->loadConfig($configFile);
        $this->connect($config);
    }

    private function loadConfig(string $file): array {
        if (!file_exists($file)) {
            throw new Exception("Configuration file not found: $file");
        }

        $config = json_decode(file_get_contents($file), true, 512, JSON_THROW_ON_ERROR);
        return $config['database'];
    }

    private function connect(array $config): void {
        $dsn = "pgsql:host={$config['host']};port={$config['port']};dbname={$config['dbname']}";
        try {
            $this->pdo = new PDO($dsn, $config['user'], $config['password'], [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
        } catch (PDOException $e) {
            throw new Exception("Database connection failed: " . $e->getMessage());
        }
    }

    public function query(string $sql, array $params = []): array {
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    public function execute(string $sql, array $params = []): bool {
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute($params);
    }

    public function getLastInsertId(): string {
        return $this->pdo->lastInsertId();
    }
}