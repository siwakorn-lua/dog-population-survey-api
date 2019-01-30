USE doggy;

CREATE TABLE `doggy`.`user` (
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `firstName` VARCHAR(50) NOT NULL,
  `lastName` VARCHAR(50) NOT NULL,
  `address` VARCHAR(100) NULL,
  `subdistrict` VARCHAR(30) NOT NULL,
  `district` VARCHAR(30) NOT NULL,
  `province` VARCHAR(30) NOT NULL,
  `profilePicture` VARCHAR(200) NULL,
  `registerDate` DATETIME NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(10) NULL,
  `questionTopic` VARCHAR(1) NOT NULL,
  `questionAnswer` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`username`));

CREATE TABLE `doggy`.`dog` (
  `dogID` INT NOT NULL AUTO_INCREMENT,
  `dogName` VARCHAR(50) NULL,
  `age` INT NULL,
  `ageRange` VARCHAR(50) NOT NULL,
  `birthDate` DATE NULL,
  `breed` VARCHAR(50) NULL,
  `gender` VARCHAR(1) NULL,
  `color` VARCHAR(50) NULL,
  `sterilized` VARCHAR(1) NOT NULL,
  `address` VARCHAR(100) NULL,
  `subdistrict` VARCHAR(50) NOT NULL,
  `district` VARCHAR(50) NOT NULL,
  `province` VARCHAR(50) NOT NULL,
  `gps` VARCHAR(100) NOT NULL,
  `remark` VARCHAR(200) NULL,
  `indoorFlag` VARCHAR(1) NULL,
  `outdoorFlag` VARCHAR(1) NULL,
  `strayFlag` VARCHAR(1) NULL,
  `owner` VARCHAR(50) NOT NULL,
  `submitDate` DATE NOT NULL,
  PRIMARY KEY (`dogID`),
  INDEX `owner_idx` (`owner` ASC),
  CONSTRAINT `owner`
    FOREIGN KEY (`owner`)
    REFERENCES `doggy`.`user` (`username`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE `doggy`.`dogpicture` (
  `dogID` INT NOT NULL,
  `picture` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`dogID`, `picture`),
  CONSTRAINT `dogID`
    FOREIGN KEY (`dogID`)
    REFERENCES `doggy`.`dog` (`dogID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE `doggy`.`vaccine` (
  `vaccineID` INT NOT NULL AUTO_INCREMENT,
  `vaccineName` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`vaccineID`));
  
CREATE TABLE `doggy`.`inject` (
  `dogID` INT NOT NULL,
  `vaccineID` INT NOT NULL,
  `date` DATE NOT NULL,
  PRIMARY KEY (`dogID`, `vaccineID`),
  INDEX `vaccine_idx` (`vaccineID` ASC),
  CONSTRAINT `dog`
    FOREIGN KEY (`dogID`)
    REFERENCES `doggy`.`dog` (`dogID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `vaccine`
    FOREIGN KEY (`vaccineID`)
    REFERENCES `doggy`.`vaccine` (`vaccineID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
