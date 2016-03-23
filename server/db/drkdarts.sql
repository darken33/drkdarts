-- phpMyAdmin SQL Dump
-- version 4.0.10.7
-- http://www.phpmyadmin.net
--
-- Client: localhost:3306
-- Généré le: Mer 23 Mars 2016 à 20:53
-- Version du serveur: 5.5.48-cll
-- Version de PHP: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `darkenne_wp208`
--

-- --------------------------------------------------------

--
-- Structure de la table `drkdarts_game`
--

DROP TABLE IF EXISTS `drkdarts_game`;
CREATE TABLE IF NOT EXISTS `drkdarts_game` (
  `id` varchar(32) COLLATE latin1_general_ci NOT NULL,
  `type` tinyint(4) NOT NULL,
  `difficulty` tinyint(4) NOT NULL,
  `state` tinyint(4) NOT NULL,
  `j1_name` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `j1_row` int(11) DEFAULT NULL,
  `j1_dart1` varchar(15) COLLATE latin1_general_ci DEFAULT NULL,
  `j1_dart2` varchar(15) COLLATE latin1_general_ci DEFAULT NULL,
  `j1_dart3` varchar(15) COLLATE latin1_general_ci DEFAULT NULL,
  `j1_rscore` int(11) DEFAULT NULL,
  `j1_score` varchar(50) COLLATE latin1_general_ci DEFAULT NULL,
  `j1_connexion` int(11) DEFAULT NULL,
  `j2_name` varchar(50) COLLATE latin1_general_ci DEFAULT NULL,
  `j2_row` int(11) DEFAULT NULL,
  `j2_dart1` varchar(15) COLLATE latin1_general_ci DEFAULT NULL,
  `j2_dart2` varchar(15) COLLATE latin1_general_ci DEFAULT NULL,
  `j2_dart3` varchar(15) COLLATE latin1_general_ci DEFAULT NULL,
  `j2_rscore` int(11) DEFAULT NULL,
  `j2_score` varchar(50) COLLATE latin1_general_ci DEFAULT NULL,
  `j2_connexion` int(11) DEFAULT NULL,
  `winner` varchar(50) COLLATE latin1_general_ci DEFAULT NULL,
  `date` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `drkdarts_score`
--

DROP TABLE IF EXISTS `drkdarts_score`;
CREATE TABLE IF NOT EXISTS `drkdarts_score` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `difficulty` tinyint(4) NOT NULL,
  `name` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `score` bigint(20) NOT NULL,
  `date` int(11) NOT NULL,
  `type` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci AUTO_INCREMENT=38 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
