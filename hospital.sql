-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-07-2024 a las 20:41:33
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hospital`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `nombre`) VALUES
(1, 'Analgesico'),
(2, 'Antibiotico'),
(3, 'Antihistaminico'),
(4, 'Antidiabetico'),
(5, 'Inhibidor de la bomba de protones'),
(6, 'Antihipertensivo'),
(7, 'Hipolipemiante'),
(8, 'Broncodilatador'),
(9, 'Hormona tiroidea'),
(16, 'Antidepresivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `concentracion`
--

CREATE TABLE `concentracion` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `concentracion`
--

INSERT INTO `concentracion` (`id`, `nombre`) VALUES
(1, '400mg'),
(2, '500mg'),
(3, '10mg'),
(4, '850mg'),
(5, '20mg'),
(6, '100mcg'),
(7, '600mg'),
(8, '100mg'),
(13, '50mcg'),
(14, '40mg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidad`
--

CREATE TABLE `especialidad` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `especialidad`
--

INSERT INTO `especialidad` (`id`, `nombre`) VALUES
(5, 'Pediatria'),
(6, 'Oncologia'),
(7, 'Cardiovascular'),
(8, 'Endodoncia'),
(9, 'Periodoncia'),
(10, 'Odontopediatria'),
(11, 'Neurologia'),
(12, 'Dermatologia'),
(13, 'Oftalmologia'),
(14, 'Generalista'),
(15, 'Gastroenterologia'),
(16, 'Urologia'),
(17, 'Vascular');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `familia`
--

CREATE TABLE `familia` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `familia`
--

INSERT INTO `familia` (`id`, `nombre`) VALUES
(1, 'Antiinflamatorio'),
(2, 'Antipiretico'),
(3, 'Penicilinas'),
(4, 'Antialergico'),
(5, 'Biguanidas'),
(6, 'Antiulceroso'),
(7, 'Inhibidores de la ECA'),
(8, 'Estatinas'),
(9, 'Beta-2 agonista'),
(10, 'Suplemento hormonal'),
(17, 'ISRS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formafarmaceutica`
--

CREATE TABLE `formafarmaceutica` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `formafarmaceutica`
--

INSERT INTO `formafarmaceutica` (`id`, `nombre`) VALUES
(1, 'Tabletas'),
(2, 'Comprimidos'),
(3, 'Capsulas'),
(4, 'Inhalador'),
(5, 'Crema');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicamento`
--

CREATE TABLE `medicamento` (
  `id` int(11) NOT NULL,
  `id_nombre` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `id_familia` int(11) NOT NULL,
  `id_concentracion` int(11) NOT NULL,
  `id_formafarmaceutica` int(11) NOT NULL,
  `id_presentacion` int(11) NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medicamento`
--

INSERT INTO `medicamento` (`id`, `id_nombre`, `id_categoria`, `id_familia`, `id_concentracion`, `id_formafarmaceutica`, `id_presentacion`, `estado`) VALUES
(1, 1, 1, 1, 1, 1, 1, 1),
(2, 2, 1, 2, 2, 2, 2, 0),
(3, 3, 2, 3, 2, 3, 3, 1),
(4, 4, 3, 4, 3, 1, 2, 0),
(5, 5, 4, 5, 4, 1, 4, 0),
(6, 6, 8, 6, 5, 3, 5, 0),
(7, 7, 6, 7, 3, 1, 4, 1),
(8, 8, 7, 8, 5, 1, 6, 1),
(9, 9, 8, 9, 6, 4, 7, 1),
(10, 10, 9, 10, 6, 1, 8, 1),
(14, 8, 7, 10, 6, 4, 7, 1),
(15, 2, 1, 2, 1, 2, 5, 0),
(16, 1, 1, 1, 4, 1, 1, 1),
(17, 31, 16, 17, 5, 3, 5, 1),
(18, 9, 8, 9, 13, 4, 12, 1),
(19, 6, 8, 6, 14, 3, 6, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nombre`
--

CREATE TABLE `nombre` (
  `id` int(11) NOT NULL,
  `nombregenerico` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `nombre`
--

INSERT INTO `nombre` (`id`, `nombregenerico`) VALUES
(1, 'Ibuprofeno'),
(2, 'Paracetamol'),
(3, 'Amoxicilina'),
(4, 'Loratadina'),
(5, 'Metformina'),
(6, 'Omeprazol'),
(7, 'Enalapril'),
(8, 'Atorvastatina'),
(9, 'Salbutamol'),
(10, 'Levotiroxina'),
(31, 'Fluoxetina');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obrasocial`
--

CREATE TABLE `obrasocial` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `obrasocial`
--

INSERT INTO `obrasocial` (`id`, `nombre`) VALUES
(1, 'OSDE'),
(2, 'Swiss Medical'),
(3, 'Galeno'),
(4, 'Medife');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `documento` int(11) NOT NULL,
  `nacimiento` date NOT NULL,
  `sexo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`id`, `nombre`, `apellido`, `documento`, `nacimiento`, `sexo`) VALUES
(1, 'Juan', 'Perez', 11111111, '1990-05-15', 'Masculino'),
(2, 'Maria', 'Gonzalez', 23423423, '1985-08-23', 'Femenino'),
(3, 'Pedro', 'Ramirez', 34534534, '1978-12-10', 'Masculino'),
(4, 'Ana', 'Lopez', 41134567, '1995-03-02', 'Femenino'),
(5, 'Luis', 'Martinez', 35098765, '1982-06-18', 'Masculino'),
(9, 'Carlos', 'Perezzz', 32132121, '1990-11-05', 'Masculino'),
(10, 'name', 'lastname', 55555555, '1999-12-31', 'Masculino');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plan`
--

CREATE TABLE `plan` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `id_obrasocial` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `plan`
--

INSERT INTO `plan` (`id`, `nombre`, `id_obrasocial`) VALUES
(1, 'Plan 100', 1),
(2, 'Plan 500', 1),
(3, 'Plan Premium', 1),
(4, 'Plan Plata', 2),
(5, 'Plan Oro', 2),
(6, 'Plan VIP', 2),
(7, 'Plan Oro', 3),
(8, 'Plan Básico', 3),
(9, 'Plan Medife 1', 4),
(10, 'Plan Medife 2', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prescripcion`
--

CREATE TABLE `prescripcion` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `vigencia` date NOT NULL,
  `diagnostico` varchar(255) NOT NULL,
  `id_profesional` int(11) NOT NULL,
  `id_paciente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `prescripcion`
--

INSERT INTO `prescripcion` (`id`, `fecha`, `vigencia`, `diagnostico`, `id_profesional`, `id_paciente`) VALUES
(35, '2024-07-12', '2024-09-10', 'Presion arterial alta', 1, 2),
(36, '2024-07-13', '2024-09-11', 'Reflujo gastroesofagico', 1, 1),
(37, '2024-07-17', '2024-09-15', 'Gripe fuerte', 1, 2),
(38, '2024-07-17', '2024-09-15', 'Fractura expuesta', 1, 2),
(48, '2024-07-20', '2024-08-19', 'Fiebre', 1, 5),
(49, '2024-07-20', '2024-08-19', 'Fractura', 1, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prescripcion_medicamento`
--

CREATE TABLE `prescripcion_medicamento` (
  `id_prescripcion` int(11) NOT NULL,
  `id_medicamento` int(11) NOT NULL,
  `nombrecomercial` varchar(100) DEFAULT NULL,
  `dosis` varchar(50) NOT NULL,
  `duracion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `prescripcion_medicamento`
--

INSERT INTO `prescripcion_medicamento` (`id_prescripcion`, `id_medicamento`, `nombrecomercial`, `dosis`, `duracion`) VALUES
(35, 2, NULL, '1 cada 1 horas', '1 dias'),
(37, 7, NULL, '1 cada 1 horas', '1 dias'),
(37, 5, NULL, '3 cada 3 horas', '4 dias'),
(37, 10, NULL, '6 cada 5 horas', '4 dias'),
(37, 9, 'Sabul', '2 cada 9 horas', '4 dias'),
(38, 1, NULL, '1 cada 8 horas', '4 dias'),
(48, 7, NULL, '2 cada 8 horas', '1 semanas'),
(48, 1, NULL, '1 cada 8 horas', '2 dias');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prescripcion_plan`
--

CREATE TABLE `prescripcion_plan` (
  `id_prescripcion` int(11) NOT NULL,
  `id_plan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `prescripcion_plan`
--

INSERT INTO `prescripcion_plan` (`id_prescripcion`, `id_plan`) VALUES
(35, 5),
(38, 6),
(48, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prescripcion_prestacion`
--

CREATE TABLE `prescripcion_prestacion` (
  `id_prescripcion` int(11) NOT NULL,
  `id_prestacion` int(11) NOT NULL,
  `lado` varchar(100) DEFAULT NULL,
  `indicacion` varchar(255) NOT NULL,
  `justificacion` varchar(255) NOT NULL,
  `resultado` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `prescripcion_prestacion`
--

INSERT INTO `prescripcion_prestacion` (`id_prescripcion`, `id_prestacion`, `lado`, `indicacion`, `justificacion`, `resultado`) VALUES
(35, 1, 'cerebro', 'indicacionnn', 'justificacionnn', NULL),
(36, 6, NULL, 'inddd', 'jusss', NULL),
(38, 2, 'Antebrazo derecho', '-', '-', NULL),
(49, 2, 'Pierna izquierda', '-', '-', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `presentacion`
--

CREATE TABLE `presentacion` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `presentacion`
--

INSERT INTO `presentacion` (`id`, `nombre`) VALUES
(1, '20 unidades'),
(2, '10 unidades'),
(3, '16 unidades'),
(4, '30 unidades'),
(5, '14 unidades'),
(6, '28 unidades'),
(7, '200 dosis'),
(8, '50 unidades'),
(12, '100 dosis'),
(13, '28 unidades');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestacion`
--

CREATE TABLE `prestacion` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `estado` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `prestacion`
--

INSERT INTO `prestacion` (`id`, `nombre`, `estado`) VALUES
(1, 'Resonancia magnetica', 1),
(2, 'Radiografia', 1),
(3, 'Analisis de sangre', 1),
(4, 'Ecografia', 1),
(5, 'Tomografia computarizada', 1),
(6, 'Endoscopia', 1),
(7, 'Electrocardiograma', 1),
(8, 'Colonoscopia', 1),
(9, 'Biopsia', 0),
(10, 'Analisis de orina', 0),
(19, 'Nuevapres', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesion`
--

CREATE TABLE `profesion` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profesion`
--

INSERT INTO `profesion` (`id`, `nombre`) VALUES
(1, 'Medico'),
(2, 'Cirujano'),
(3, 'Odontologo'),
(4, 'Enfermero');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesional`
--

CREATE TABLE `profesional` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `documento` int(11) NOT NULL,
  `domicilio` varchar(100) NOT NULL,
  `matricula` int(11) NOT NULL,
  `refeps` int(11) NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `id_profesion` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profesional`
--

INSERT INTO `profesional` (`id`, `nombre`, `apellido`, `documento`, `domicilio`, `matricula`, `refeps`, `estado`, `id_profesion`, `id_usuario`) VALUES
(1, 'Maria', 'Quinteros', 12345678, 'Av. La Finur 555', 32145, 12345, 1, 1, 3),
(2, 'Carlos', 'Mecha', 87654321, 'Ayacucho 999', 32161, 54321, 1, 1, 6),
(7, 'Luis', 'Monzon', 89089089, 'san martun 2', 32121, 12312, 1, 3, 16),
(8, 'Sebastian', 'Orion', 43243243, 'Lavalle 1324', 67867, 87676, 1, 2, 17),
(9, 'Mario', 'Quintero', 76576576, 'Pringles 321', 56756, 76565, 0, 1, 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesional_especialidad`
--

CREATE TABLE `profesional_especialidad` (
  `id_profesional` int(11) NOT NULL,
  `id_especialidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profesional_especialidad`
--

INSERT INTO `profesional_especialidad` (`id_profesional`, `id_especialidad`) VALUES
(8, 7),
(7, 8),
(7, 9),
(2, 6),
(2, 5),
(1, 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id`, `nombre`) VALUES
(1, 'administrador'),
(2, 'profesional');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `clave` varchar(255) NOT NULL,
  `estado` tinyint(4) NOT NULL,
  `id_rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `clave`, `estado`, `id_rol`) VALUES
(3, '12345678', '$2b$10$0Dj88V8gLfuW8NwkBdSvpe4IqtApPEBbkE4i4r9bhcUcGgZUcBZ/W', 1, 2),
(5, 'admin', '$2b$10$6FjrYngFY/4ky7Y29jtK3.HPeWrJ8QK8c2t36Mfx6S4KnH4LZeyGe', 1, 1),
(6, '87654321', '$2b$10$CURze5z54WjDo/L/LYMYk.E1wk4nChDsfyxq/nV2nujjtrnjRcjWW', 1, 2),
(16, '89089089', '$2b$10$AxUfBEZ.gpYwiAq4mNVzsexbIrmzbV6T4ebmZ.mzNXZpO431PYF/q', 1, 2),
(17, '43243243', '$2b$10$SzVrrZsMPsfWIkYmm81FIe1eiHvt2KVu7OVs3GFJ.j7x0PIw84cma', 1, 2),
(18, '76576576', '$2b$10$DkavBNPaNUbY9uHH4TDlj.GYahZ5kf4R6W7twWidtbJ2hWNkXPv5a', 0, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `concentracion`
--
ALTER TABLE `concentracion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `familia`
--
ALTER TABLE `familia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `formafarmaceutica`
--
ALTER TABLE `formafarmaceutica`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `medicamento`
--
ALTER TABLE `medicamento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_nombre` (`id_nombre`),
  ADD KEY `id_categoria` (`id_categoria`),
  ADD KEY `id_familia` (`id_familia`),
  ADD KEY `id_concentracion` (`id_concentracion`),
  ADD KEY `id_formafarmaceutica` (`id_formafarmaceutica`),
  ADD KEY `id_presentacion` (`id_presentacion`);

--
-- Indices de la tabla `nombre`
--
ALTER TABLE `nombre`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `obrasocial`
--
ALTER TABLE `obrasocial`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `plan`
--
ALTER TABLE `plan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_obrasocial` (`id_obrasocial`);

--
-- Indices de la tabla `prescripcion`
--
ALTER TABLE `prescripcion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_paciente` (`id_paciente`),
  ADD KEY `id_profesional` (`id_profesional`);

--
-- Indices de la tabla `prescripcion_medicamento`
--
ALTER TABLE `prescripcion_medicamento`
  ADD KEY `id_prescripcion` (`id_prescripcion`),
  ADD KEY `id_medicamento` (`id_medicamento`);

--
-- Indices de la tabla `prescripcion_plan`
--
ALTER TABLE `prescripcion_plan`
  ADD KEY `id_plan` (`id_plan`),
  ADD KEY `id_prescripcion` (`id_prescripcion`);

--
-- Indices de la tabla `prescripcion_prestacion`
--
ALTER TABLE `prescripcion_prestacion`
  ADD KEY `id_prescripcion` (`id_prescripcion`),
  ADD KEY `id_prestacion` (`id_prestacion`);

--
-- Indices de la tabla `presentacion`
--
ALTER TABLE `presentacion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `prestacion`
--
ALTER TABLE `prestacion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `profesion`
--
ALTER TABLE `profesion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `profesional`
--
ALTER TABLE `profesional`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_profesion` (`id_profesion`);

--
-- Indices de la tabla `profesional_especialidad`
--
ALTER TABLE `profesional_especialidad`
  ADD KEY `id_profesional` (`id_profesional`),
  ADD KEY `id_especialidad` (`id_especialidad`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `concentracion`
--
ALTER TABLE `concentracion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `familia`
--
ALTER TABLE `familia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `formafarmaceutica`
--
ALTER TABLE `formafarmaceutica`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `medicamento`
--
ALTER TABLE `medicamento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `nombre`
--
ALTER TABLE `nombre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `obrasocial`
--
ALTER TABLE `obrasocial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `plan`
--
ALTER TABLE `plan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `prescripcion`
--
ALTER TABLE `prescripcion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de la tabla `presentacion`
--
ALTER TABLE `presentacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `prestacion`
--
ALTER TABLE `prestacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `profesion`
--
ALTER TABLE `profesion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `profesional`
--
ALTER TABLE `profesional`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `medicamento`
--
ALTER TABLE `medicamento`
  ADD CONSTRAINT `medicamento_ibfk_1` FOREIGN KEY (`id_nombre`) REFERENCES `nombre` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `medicamento_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `medicamento_ibfk_3` FOREIGN KEY (`id_familia`) REFERENCES `familia` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `medicamento_ibfk_4` FOREIGN KEY (`id_concentracion`) REFERENCES `concentracion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `medicamento_ibfk_5` FOREIGN KEY (`id_formafarmaceutica`) REFERENCES `formafarmaceutica` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `medicamento_ibfk_6` FOREIGN KEY (`id_presentacion`) REFERENCES `presentacion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `plan`
--
ALTER TABLE `plan`
  ADD CONSTRAINT `plan_ibfk_1` FOREIGN KEY (`id_obrasocial`) REFERENCES `obrasocial` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `prescripcion`
--
ALTER TABLE `prescripcion`
  ADD CONSTRAINT `prescripcion_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `prescripcion_ibfk_2` FOREIGN KEY (`id_profesional`) REFERENCES `profesional` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `prescripcion_medicamento`
--
ALTER TABLE `prescripcion_medicamento`
  ADD CONSTRAINT `prescripcion_medicamento_ibfk_1` FOREIGN KEY (`id_prescripcion`) REFERENCES `prescripcion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `prescripcion_medicamento_ibfk_2` FOREIGN KEY (`id_medicamento`) REFERENCES `medicamento` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `prescripcion_plan`
--
ALTER TABLE `prescripcion_plan`
  ADD CONSTRAINT `prescripcion_plan_ibfk_1` FOREIGN KEY (`id_plan`) REFERENCES `plan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `prescripcion_plan_ibfk_2` FOREIGN KEY (`id_prescripcion`) REFERENCES `prescripcion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `prescripcion_prestacion`
--
ALTER TABLE `prescripcion_prestacion`
  ADD CONSTRAINT `prescripcion_prestacion_ibfk_1` FOREIGN KEY (`id_prescripcion`) REFERENCES `prescripcion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `prescripcion_prestacion_ibfk_2` FOREIGN KEY (`id_prestacion`) REFERENCES `prestacion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `profesional`
--
ALTER TABLE `profesional`
  ADD CONSTRAINT `profesional_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `profesional_ibfk_3` FOREIGN KEY (`id_profesion`) REFERENCES `profesion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `profesional_especialidad`
--
ALTER TABLE `profesional_especialidad`
  ADD CONSTRAINT `profesional_especialidad_ibfk_1` FOREIGN KEY (`id_profesional`) REFERENCES `profesional` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `profesional_especialidad_ibfk_2` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidad` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
