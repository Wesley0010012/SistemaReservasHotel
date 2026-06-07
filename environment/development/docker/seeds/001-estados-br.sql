INSERT INTO estados (id, nome, uf, "createdAt", "updatedAt", active)
VALUES
    (11, 'Rondonia', 'RO', NOW(), NOW(), TRUE),
    (12, 'Acre', 'AC', NOW(), NOW(), TRUE),
    (13, 'Amazonas', 'AM', NOW(), NOW(), TRUE),
    (14, 'Roraima', 'RR', NOW(), NOW(), TRUE),
    (15, 'Para', 'PA', NOW(), NOW(), TRUE),
    (16, 'Amapa', 'AP', NOW(), NOW(), TRUE),
    (17, 'Tocantins', 'TO', NOW(), NOW(), TRUE),
    (21, 'Maranhao', 'MA', NOW(), NOW(), TRUE),
    (22, 'Piaui', 'PI', NOW(), NOW(), TRUE),
    (23, 'Ceara', 'CE', NOW(), NOW(), TRUE),
    (24, 'Rio Grande do Norte', 'RN', NOW(), NOW(), TRUE),
    (25, 'Paraiba', 'PB', NOW(), NOW(), TRUE),
    (26, 'Pernambuco', 'PE', NOW(), NOW(), TRUE),
    (27, 'Alagoas', 'AL', NOW(), NOW(), TRUE),
    (28, 'Sergipe', 'SE', NOW(), NOW(), TRUE),
    (29, 'Bahia', 'BA', NOW(), NOW(), TRUE),
    (31, 'Minas Gerais', 'MG', NOW(), NOW(), TRUE),
    (32, 'Espirito Santo', 'ES', NOW(), NOW(), TRUE),
    (33, 'Rio de Janeiro', 'RJ', NOW(), NOW(), TRUE),
    (35, 'Sao Paulo', 'SP', NOW(), NOW(), TRUE),
    (41, 'Parana', 'PR', NOW(), NOW(), TRUE),
    (42, 'Santa Catarina', 'SC', NOW(), NOW(), TRUE),
    (43, 'Rio Grande do Sul', 'RS', NOW(), NOW(), TRUE),
    (50, 'Mato Grosso do Sul', 'MS', NOW(), NOW(), TRUE),
    (51, 'Mato Grosso', 'MT', NOW(), NOW(), TRUE),
    (52, 'Goias', 'GO', NOW(), NOW(), TRUE),
    (53, 'Distrito Federal', 'DF', NOW(), NOW(), TRUE)
ON CONFLICT (id) DO UPDATE
SET nome = EXCLUDED.nome,
    uf = EXCLUDED.uf,
    "updatedAt" = NOW(),
    active = TRUE;

SELECT setval(pg_get_serial_sequence('estados', 'id'), GREATEST((SELECT MAX(id) FROM estados), 1), TRUE);
