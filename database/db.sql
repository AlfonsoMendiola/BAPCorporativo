CREATE DATABASE bapexamen;
USE bapexamen;

CREATE TABLE usuarios(
    id int auto_increment,
    nombre varchar(255),
    email varchar(255),
    pass varchar(255),
    createdAt timestamp,
    updatedAt timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE tareas(
    id int auto_increment,
    titulo varchar(255),
    descripcion varchar(255),
    completado enum('true', 'false') not null default 'false',
    fechaEntrega date,
    comentario varchar(255),
    responsable varchar(255),
    usuarioId int not null,
    createdAt timestamp,
    updatedAt timestamp,
    PRIMARY KEY (id),
    FOREIGN KEY (usuarioId) REFERENCES usuarios(id)
);