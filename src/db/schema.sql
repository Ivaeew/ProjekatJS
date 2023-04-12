

CREATE TABLE IF NOT EXISTS `autor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ime` varchar(255) NOT NULL,
  `prezime` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;  

CREATE TABLE IF NOT EXISTS `knjiga` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ime` varchar(255) NOT NULL,
  `url_slike` varchar(255) NOT NULL,
  `na_stanju` TINYINT(1) NOT NULL DEFAULT 1,
  `autor_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `url_slike` (`url_slike`),
  KEY `autor_id` (`autor_id`),
  CONSTRAINT `knjiga_ibfk_1` FOREIGN KEY (`autor_id`) REFERENCES `autor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `zanr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ime` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ime` (`ime`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `zanr_knjiga` (
  `zanr_id` int(11) NOT NULL,
  `knjiga_id` int(11) NOT NULL,
  KEY `zanr_id` (`zanr_id`),
  KEY `knjiga_id` (`knjiga_id`),
  CONSTRAINT `zanr_knjiga_ibfk_1` FOREIGN KEY (`zanr_id`) REFERENCES `zanr` (`id`),
  CONSTRAINT `zanr_knjiga_ibfk_2` FOREIGN KEY (`knjiga_id`) REFERENCES `knjiga` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `korisnik` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `korisnicko_ime` VARCHAR(255) NOT NULL,
  `sifra` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `korisnicko_ime` (`korisnicko_ime`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;