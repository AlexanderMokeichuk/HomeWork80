-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: storage
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories`
(
  `id`          int                                     NOT NULL AUTO_INCREMENT,
  `name`        varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK
TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories`
VALUES (1, 'Monitors', NULL),
       (3, 'keyboard', NULL),
       (4, 'headphones', NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items`
(
  `id`          int                                     NOT NULL AUTO_INCREMENT,
  `category_id` int                                     NOT NULL,
  `place_id`    int                                     NOT NULL,
  `name`        varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `image`       varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY           `items_categories_id_fk` (`category_id`),
  KEY           `items_places_id_fk` (`place_id`),
  CONSTRAINT `items_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `items_places_id_fk` FOREIGN KEY (`place_id`) REFERENCES `places` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK
TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items`
VALUES (1, 1, 1, 'DAHUA 19,5\" DHI-LM20-A202V,TN', 'BLACK 1600x 900', NULL),
       (2, 1, 1, 'UNIVIEW 21.5\" MW-LC22 ', 'LED VA FHD 16:9/75Hz/14ms/3000:1/178/178/250cd/m2/1920×1080 VGA HDMI',
        NULL),
       (3, 3, 3, 'Bloody S87 RED', 'Подсветка RGB', NULL),
       (4, 3, 3, 'Bloody S98-Naraka', NULL, NULL),
       (5, 3, 3, 'A4tech Bloody B2500', NULL, NULL),
       (6, 4, 2, 'HUAWEI FreeBuds', NULL, NULL),
       (7, 4, 2, 'Sony WF-1000XM4', NULL, NULL),
       (8, 4, 2, 'Sennheiser Momentum True Wireless', NULL, NULL),
       (9, 4, 2, 'Apple AirPods', NULL, NULL),
       (10, 4, 1, 'Arctis Nova 1P Multi-System Gaming Headset',
        'Almighty Audio — Custom-designed Nova Acoustic System features best-in class audio for gaming with High Fidelity Drivers. Fully customize your ideal sound experience with a first-in gaming Pro-grade Parametric EQ.',
        'images/d462a60e-d204-43b9-bad5-9847cd721123.jpg');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `places`
--

DROP TABLE IF EXISTS `places`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `places`
(
  `id`          int                                     NOT NULL AUTO_INCREMENT,
  `name`        varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `places`
--

LOCK
TABLES `places` WRITE;
/*!40000 ALTER TABLE `places` DISABLE KEYS */;
INSERT INTO `places`
VALUES (1, 'Europe', NULL),
       (2, 'North America', NULL),
       (3, 'Central Asia', NULL);
/*!40000 ALTER TABLE `places` ENABLE KEYS */;
UNLOCK
TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-05 12:09:38