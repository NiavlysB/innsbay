-- phpMyAdmin SQL Dump
-- version 3.4.1
-- http://www.phpmyadmin.net
--
-- Client: sql.toile-libre.org
-- Généré le : Dim 28 Juin 2015 à 17:44
-- Version du serveur: 5.5.37
-- Version de PHP: 5.2.11

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `innsbay_projweb`
--

-- --------------------------------------------------------

--
-- Structure de la table `albums`
--

CREATE TABLE IF NOT EXISTS `albums` (
  `IdAlbum` int(11) NOT NULL AUTO_INCREMENT,
  `NomAlbum` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`IdAlbum`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=13 ;

--
-- Contenu de la table `albums`
--

INSERT INTO `albums` (`IdAlbum`, `NomAlbum`) VALUES
(7, 'The Goat Rodeo Sessions'),
(12, 'Revolver');

-- --------------------------------------------------------

--
-- Structure de la table `artistes`
--

CREATE TABLE IF NOT EXISTS `artistes` (
  `IdArtiste` int(11) NOT NULL AUTO_INCREMENT,
  `NomArtiste` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `PseudoArtiste` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`IdArtiste`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=48 ;

--
-- Contenu de la table `artistes`
--

INSERT INTO `artistes` (`IdArtiste`, `NomArtiste`, `PseudoArtiste`) VALUES
(2, 'Chris Thile', ''),
(3, 'Yo Yo Ma', ''),
(9, 'The Beatles', 'The Fab Four'),
(42, 'John Fahey', 'Blind Joe Death'),
(47, 'Machin Tartempion', 'Truc');

-- --------------------------------------------------------

--
-- Structure de la table `artistesalbums`
--

CREATE TABLE IF NOT EXISTS `artistesalbums` (
  `IdAlbum` int(11) NOT NULL,
  `IdArtiste` int(11) NOT NULL,
  PRIMARY KEY (`IdArtiste`,`IdAlbum`),
  KEY `IdAlbum` (`IdAlbum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `artistesalbums`
--

INSERT INTO `artistesalbums` (`IdAlbum`, `IdArtiste`) VALUES
(7, 2),
(7, 3),
(12, 9);

-- --------------------------------------------------------

--
-- Structure de la table `artistesTest`
--

CREATE TABLE IF NOT EXISTS `artistesTest` (
  `IdArtiste` int(11) NOT NULL,
  `NomArtiste` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `PseudoArtiste` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`IdArtiste`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `artistesTest`
--

INSERT INTO `artistesTest` (`IdArtiste`, `NomArtiste`, `PseudoArtiste`) VALUES
(42, 'John Fahey', 'Blind Joe Death'),
(47, 'Machin Tartempion', 'Truc');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `IdUtilisateur` int(11) NOT NULL AUTO_INCREMENT,
  `Login` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Anonyme',
  `Password` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`IdUtilisateur`,`Login`,`Password`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

--
-- Contenu de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`IdUtilisateur`, `Login`, `Password`) VALUES
(1, 'Niavlys', '5ed25af7b1ed23fb00122e13d7f74c4d8262acd8'),
(2, 'JB', '6a20d919ef6203f8c0cc75d194674605a4b768f0');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `artistesalbums`
--
ALTER TABLE `artistesalbums`
  ADD CONSTRAINT `artistesalbums_ibfk_2` FOREIGN KEY (`IdArtiste`) REFERENCES `artistes` (`IdArtiste`),
  ADD CONSTRAINT `artistesalbums_ibfk_3` FOREIGN KEY (`IdAlbum`) REFERENCES `albums` (`IdAlbum`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
