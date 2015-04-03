-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Ven 03 Avril 2015 à 11:42
-- Version du serveur :  5.6.21
-- Version de PHP :  5.5.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `aeroport`
--

-- --------------------------------------------------------

--
-- Structure de la table `aeroport`
--

CREATE TABLE IF NOT EXISTS `aeroport` (
`idAeroport` int(11) NOT NULL,
  `nomAeroport` varchar(45) NOT NULL,
  `ville_idVille` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `aeroport`
--

INSERT INTO `aeroport` (`idAeroport`, `nomAeroport`, `ville_idVille`) VALUES
(1, 'Guipavas', 1),
(2, 'Rennes Aeroport', 2);

-- --------------------------------------------------------

--
-- Structure de la table `hotel`
--

CREATE TABLE IF NOT EXISTS `hotel` (
`idHotel` int(11) NOT NULL,
  `nomHotel` varchar(45) NOT NULL,
  `villeHotel` varchar(45) NOT NULL,
  `etoiles` int(11) DEFAULT NULL,
  `tarif` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `hotel`
--

INSERT INTO `hotel` (`idHotel`, `nomHotel`, `villeHotel`, `etoiles`, `tarif`) VALUES
(1, 'Grand Hotel', 'Londres', 3, 25),
(3, 'Super hotel', 'Paris', 5, 900),
(4, 'Hotel de la Reine', 'Londres', 5, 1500),
(5, 'Ritz', 'Paris', 5, 500),
(6, 'California', 'Paris', 4, 200),
(7, 'Shangri-la', 'Paris', 5, 866),
(8, 'Hilton', 'Londres', 5, 400),
(9, 'London Town Hotel', 'Londres', 4, 130),
(10, 'Hostal atenas', 'Grenade', 4, 300),
(11, 'Plaza nueva', 'Grenade', 2, 40),
(12, 'Sarai', 'Grenade', 3, 300),
(13, 'Fonte cruz', 'Grenade', 5, 1000),
(14, 'Delta waterfront', 'Kingston', 5, 740),
(15, 'Upon thames', 'Kingston', 3, 230),
(16, '4 points', 'Kingston', 4, 400),
(17, 'LuxeHotel', 'Kingston', 5, 800),
(18, 'Best Western Gregory', 'New-York', 2, 136),
(19, 'Stay brigde', 'New-York', 3, 128),
(20, 'Distrikt Hotel', 'New-York', 3, 128),
(21, 'Refinery', 'New-York', 5, 161),
(22, 'Arenula Sas', 'Rome', 2, 104),
(23, 'Grande Minerva', 'Rome', 5, 362),
(24, 'Kolbe Hotel', 'Rome', 4, 114),
(25, 'Papillo', 'Rome', 3, 83),
(26, 'Generator Hostel', 'Copenhague', 2, 46),
(27, 'Sct.Thomas', 'Copenhague', 3, 90),
(28, 'Admiral Hotel', 'Copenhague', 4, 121),
(29, 'Danhostel', 'Copenhague', 5, 93);

-- --------------------------------------------------------

--
-- Structure de la table `hotel_has_publicite`
--

CREATE TABLE IF NOT EXISTS `hotel_has_publicite` (
  `hotel_idHotel` int(11) NOT NULL,
  `publicite_idPublicite` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `pays`
--

CREATE TABLE IF NOT EXISTS `pays` (
`idPays` int(11) NOT NULL,
  `nomPays` varchar(45) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `pays`
--

INSERT INTO `pays` (`idPays`, `nomPays`) VALUES
(1, 'France'),
(2, 'Allemagne');

-- --------------------------------------------------------

--
-- Structure de la table `publicite`
--

CREATE TABLE IF NOT EXISTS `publicite` (
`idPublicite` int(11) NOT NULL,
  `dateDiffusion` date NOT NULL,
  `heureDiffusion` varchar(45) DEFAULT NULL,
  `hotel_idHotel` int(11) NOT NULL,
  `vol_idVol` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `publicite`
--

INSERT INTO `publicite` (`idPublicite`, `dateDiffusion`, `heureDiffusion`, `hotel_idHotel`, `vol_idVol`) VALUES
(4, '2015-02-13', '15:46', 1, 2);

-- --------------------------------------------------------

--
-- Structure de la table `publicite_has_vol`
--

CREATE TABLE IF NOT EXISTS `publicite_has_vol` (
  `publicite_idPublicite` int(11) NOT NULL,
  `vol_idVol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `publicite_has_vol`
--

INSERT INTO `publicite_has_vol` (`publicite_idPublicite`, `vol_idVol`) VALUES
(4, 2);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `login` int(11) NOT NULL,
  `password` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `ville`
--

CREATE TABLE IF NOT EXISTS `ville` (
`idVille` int(11) NOT NULL,
  `nomVille` varchar(45) NOT NULL,
  `pays_idPays` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `ville`
--

INSERT INTO `ville` (`idVille`, `nomVille`, `pays_idPays`) VALUES
(1, 'Brest', 1),
(2, 'Rennes', 1);

-- --------------------------------------------------------

--
-- Structure de la table `vol`
--

CREATE TABLE IF NOT EXISTS `vol` (
`idVol` int(11) NOT NULL,
  `lieuDepart` varchar(45) NOT NULL,
  `lieuArrivee` varchar(45) NOT NULL,
  `dateDepart` varchar(45) NOT NULL,
  `dateArrivee` varchar(45) NOT NULL,
  `prix` varchar(45) NOT NULL,
  `aeroport_idAeroport` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `vol`
--

INSERT INTO `vol` (`idVol`, `lieuDepart`, `lieuArrivee`, `dateDepart`, `dateArrivee`, `prix`, `aeroport_idAeroport`) VALUES
(2, 'Brest', 'Paris', '7/4/2015', '7/4/2015', '35', 1),
(11, 'Londres', 'Copenhague', '19/4/2015', '19/4/2015', '32', 1),
(13, 'Paris', 'Londres', '19/6/2015', '19/6/2015', '60', 1),
(14, 'Paris', 'Grenade', '13/6/2015', '14/6/2015', '105', 1),
(15, 'Paris', 'Kingston', '13/6/2015', '14/6/2015', '120', 1),
(16, 'Paris', 'New-York', '26/10/2015', '26/10/2015', '210', 1),
(17, 'Paris', 'Rome', '29/4/2015', '29/4/2015', '30', 1);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `aeroport`
--
ALTER TABLE `aeroport`
 ADD PRIMARY KEY (`idAeroport`), ADD KEY `fk_aeroport_ville1_idx` (`ville_idVille`);

--
-- Index pour la table `hotel`
--
ALTER TABLE `hotel`
 ADD PRIMARY KEY (`idHotel`);

--
-- Index pour la table `hotel_has_publicite`
--
ALTER TABLE `hotel_has_publicite`
 ADD PRIMARY KEY (`hotel_idHotel`,`publicite_idPublicite`), ADD KEY `fk_hotel_has_publicite_publicite1_idx` (`publicite_idPublicite`), ADD KEY `fk_hotel_has_publicite_hotel1_idx` (`hotel_idHotel`);

--
-- Index pour la table `pays`
--
ALTER TABLE `pays`
 ADD PRIMARY KEY (`idPays`);

--
-- Index pour la table `publicite`
--
ALTER TABLE `publicite`
 ADD PRIMARY KEY (`idPublicite`), ADD KEY `fk_publicite_hotel1_idx` (`hotel_idHotel`), ADD KEY `fk_publicite_vol1_idx` (`vol_idVol`);

--
-- Index pour la table `publicite_has_vol`
--
ALTER TABLE `publicite_has_vol`
 ADD PRIMARY KEY (`publicite_idPublicite`,`vol_idVol`), ADD KEY `fk_publicite_has_vol_vol1_idx` (`vol_idVol`), ADD KEY `fk_publicite_has_vol_publicite1_idx` (`publicite_idPublicite`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
 ADD PRIMARY KEY (`login`);

--
-- Index pour la table `ville`
--
ALTER TABLE `ville`
 ADD PRIMARY KEY (`idVille`), ADD KEY `fk_ville_pays_idx` (`pays_idPays`);

--
-- Index pour la table `vol`
--
ALTER TABLE `vol`
 ADD PRIMARY KEY (`idVol`), ADD KEY `fk_vol_aeroport1_idx` (`aeroport_idAeroport`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `aeroport`
--
ALTER TABLE `aeroport`
MODIFY `idAeroport` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `hotel`
--
ALTER TABLE `hotel`
MODIFY `idHotel` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT pour la table `pays`
--
ALTER TABLE `pays`
MODIFY `idPays` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `publicite`
--
ALTER TABLE `publicite`
MODIFY `idPublicite` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT pour la table `ville`
--
ALTER TABLE `ville`
MODIFY `idVille` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `vol`
--
ALTER TABLE `vol`
MODIFY `idVol` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=18;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `aeroport`
--
ALTER TABLE `aeroport`
ADD CONSTRAINT `fk_aeroport_ville1` FOREIGN KEY (`ville_idVille`) REFERENCES `ville` (`idVille`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `hotel_has_publicite`
--
ALTER TABLE `hotel_has_publicite`
ADD CONSTRAINT `fk_hotel_has_publicite_hotel1` FOREIGN KEY (`hotel_idHotel`) REFERENCES `hotel` (`idHotel`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_hotel_has_publicite_publicite1` FOREIGN KEY (`publicite_idPublicite`) REFERENCES `publicite` (`idPublicite`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `publicite`
--
ALTER TABLE `publicite`
ADD CONSTRAINT `fk_publicite_hotel1` FOREIGN KEY (`hotel_idHotel`) REFERENCES `hotel` (`idHotel`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_publicite_vol1` FOREIGN KEY (`vol_idVol`) REFERENCES `vol` (`idVol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `publicite_has_vol`
--
ALTER TABLE `publicite_has_vol`
ADD CONSTRAINT `fk_publicite_has_vol_publicite1` FOREIGN KEY (`publicite_idPublicite`) REFERENCES `publicite` (`idPublicite`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_publicite_has_vol_vol1` FOREIGN KEY (`vol_idVol`) REFERENCES `vol` (`idVol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `ville`
--
ALTER TABLE `ville`
ADD CONSTRAINT `fk_ville_pays` FOREIGN KEY (`pays_idPays`) REFERENCES `pays` (`idPays`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `vol`
--
ALTER TABLE `vol`
ADD CONSTRAINT `fk_vol_aeroport1` FOREIGN KEY (`aeroport_idAeroport`) REFERENCES `aeroport` (`idAeroport`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
