create database publace;

create table usuario(
    id serial primary key not null,
    name varchar(144) not null,
    email varchar(144) not null,
    password varchar(144) not null
);

create table place(
    id serial primary key not null,
    name varchar(144) not null,
    descricao varchar(144),
    location geom,
);

create table relation(
    id serial primary key not null,
    name varchar(30),
);

create table place_usuario(
    id serial primary key not null,
    foreign key (relation_id) references relation(id),
    foreign key (usuario_id) references usuario(id),
    foreign key (place_id) references place(id),
);

insert into relation values (DEFAULT, 'at');
insert into relation values (DEFAULT, 'maybe');
insert into relation values (DEFAULT, 'going');

insert into place values (DEFAULT, 'Praça Joca Neves', 'Praça top', geom);
