-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 02, 2024 at 12:22 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lsrp`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `accID` int(5) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` varchar(25) NOT NULL DEFAULT 'user',
  `avatar` varchar(32) DEFAULT NULL,
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`accID`, `username`, `password`, `email`, `role`, `avatar`, `updatedAt`, `createdAt`) VALUES
(5, 'Radics', '$argon2id$v=19$m=65536,t=3,p=4$jvG5UX6mcksNvGYfBHjoNg$tkaoy0Ygok0pLX/eJo1DignIFNY242N+FgoWH+J1/DI', 'radicsadam0024@gmail.com', 'user', '', '2024-04-28 16:37:09', '2024-03-11 00:00:00'),
(19, 'admin', '$argon2id$v=19$m=65536,t=3,p=4$4atOi6WdU/HcKgbxUCKttQ$+3PF8AKeU3K6P+EQZDJ+5jkG8qzupKPFRW5YRr8C5EQ', 'admin@admin.hu', 'admin', '1714503956844.png', '2024-04-30 21:08:28', '2024-04-04 22:28:38'),
(39, 'teszt', '$argon2id$v=19$m=65536,t=3,p=4$/w3Qpor0fqcZdf2mJak4Vw$hcuv+ZuFZpUVJdmLhvp5wvengwWWWkulc7oZ6L/e9r8', 'teszt@test.hu', 'user', '', '2024-04-30 20:58:39', '2024-04-30 20:57:25');

-- --------------------------------------------------------

--
-- Table structure for table `characters`
--

CREATE TABLE `characters` (
  `charID` int(5) NOT NULL,
  `accID` int(5) NOT NULL,
  `charName` varchar(50) NOT NULL,
  `gameTime` int(7) NOT NULL,
  `cashBalance` int(25) NOT NULL,
  `bankBalance` int(25) NOT NULL,
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `characters`
--

INSERT INTO `characters` (`charID`, `accID`, `charName`, `gameTime`, `cashBalance`, `bankBalance`, `updatedAt`) VALUES
(1, 5, 'Kristofer Rodriguez', 601232, 1500021331, 2147483647, '2020-01-10 08:26:10'),
(3, 19, 'Kis Béla', 12493022, 1231093123, -412412, '2024-04-04 20:26:10'),
(5, 33, 'Kis Katie', 45123, 412451, 322111, '2024-04-10 11:02:37'),
(6, 39, 'Tesztelek József', 231321, 124112313, 515151, '2024-04-18 11:02:37');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `newsID` int(11) NOT NULL,
  `title` longtext NOT NULL,
  `date` varchar(15) NOT NULL,
  `context` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`newsID`, `title`, `date`, `context`) VALUES
(26, '<strong>Megérkezett az új GTA 5 frissítés: \"Városi Razzia\"!</strong>', '2024-04-10', 'A Rockstar Games bejelentette legújabb frissítését a GTA 5-höz, amely a \"Városi Razzia\" nevet viseli. A frissítésben új küldetések és események várnak rád, ahol belevetheted magad a városi rendőrség munkájába. <strong>Rajongók készüljenek fel az izgalomra, mert megérkezett a legújabb kaland!</strong>\n\nTovábbi részletekért kattints ide: <a href=\"https://gtanews.com/városi-razzia-frissítés\">gtanews.com/városi-razzia-frissítés</a>'),
(27, 'A GTA 5 legújabb frissítése: \"Háború a Bandákkal\" most elérhető!', '2024-04-10', 'A Rockstar Games rajongói régóta várták, és most végre itt van: a GTA 5 legfrissebb frissítése, a \"Háború a Bandákkal\" már letölthető és játszható! Ez a frissítés tele van izgalmakkal és újdonságokkal, amelyek garantáltan felpezsdítik a játékélményt. <p>Indulj harcba a város legveszélyesebb bandáival, és bizonyítsd be, hogy te vagy a legkeményebb!</p>\n\nA frissítés tartalmazza a következőket:\n<ul>\n<li>Vadonatúj küldetések és feladatok, amelyek során megmutathatod ügyességedet és bátorságodat.</li>\n<li>Friss járművek és fegyverek, hogy még nagyobb pusztítást vihess végbe az utcákon.</li>\n<li>Kihívások és versenyek, ahol megmérkőzhetsz más játékosokkal és bizonyíthatod, hogy te vagy a legjobb a városban.</li>\n</ul>\n<p>Ne maradj le a legújabb kalandokról! Töltsd le most a \"Háború a Bandákkal\" frissítést, és csatlakozz a harchoz!</p>\n<p>További információkért látogass el a <a href=\"https://gtanews.com/háború-a-bandákkal-frissítés\">gtanews.com/háború-a-bandákkal-frissítés</a> weboldalra.</p>'),
(28, '<h2>A GTA 5 legújabb frissítése: \"Maffia Birodalom\" most elérhető!</h2>', '2024-04-05', 'A Rockstar Games bejelentette a GTA 5 legújabb frissítését, amely a \"Maffia Birodalom\" nevet viseli. Ez a frissítés izgalmas új küldetéseket és eseményeket hoz a játékba, amelyekben a város legveszélyesebb maffiacsoportjaival kell megküzdened. <p><strong>Merülj el a bűnözői világban, és építsd fel saját maffia birodalmadat!</strong></p>\n\nA frissítés tartalmazza a következőket:\n\n<ul>\n<li>Új történetek és küldetések, amelyek során bebizonyíthatod, hogy te vagy a város legnagyobb bűnözője.</li>\n<li>Vadonatúj járművek és fegyverek, hogy még hatékonyabban hajtsd végre a maffia akciókat.</li>\n<li>Maffia háborúk és hatalmi harcok, ahol bizonyíthatod, hogy kiérdemled a város legfőbb helyét.</li>\n</ul>\n<p>Ne hagyd ki ezt az izgalmas lehetőséget! Töltsd le most a \"Maffia Birodalom\" frissítést, és lépj be a maffia világába!</p>\n<p>További részletekért és letöltésért látogass el a <a href=\"https://gtanews.com/maffia-birodalom-frissítés\">gtanews.com/maffia-birodalom-frissítés</a> weboldalra.</p>'),
(29, 'Teszt esemény', '2024-04-18', 'Teszt esemény');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`accID`);

--
-- Indexes for table `characters`
--
ALTER TABLE `characters`
  ADD PRIMARY KEY (`charID`),
  ADD KEY `accID` (`accID`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`newsID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `accID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `characters`
--
ALTER TABLE `characters`
  MODIFY `charID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `newsID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
