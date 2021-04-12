create database publace;
--ALTER DATABASE publace SET search_path=public,postgis;
--CREATE EXTENSION postgis;

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
    image varchar(144),
    geom geometry
);

create table relation(
    id serial primary key not null,
    name varchar(30)
);

create table place_usuario(
    id serial primary key not null,
	usuario_id integer,
	place_id integer,
	relation_id integer,
    foreign key (usuario_id) references usuario(id),
    foreign key (place_id) references place(id),
	foreign key (relation_id) references relation(id)
);

insert into relation values (DEFAULT, 'at');
insert into relation values (DEFAULT, 'maybe');
insert into relation values (DEFAULT, 'going');

insert into place values (DEFAULT, 'Praça Joca Neves', 'Praça top', 'joca-neves.png', ST_SetSRID(ST_MakePoint(-50.3350545, -27.81494), 4326));
insert into place values (DEFAULT, 'Parque Jonas Ramos', 'Tanque', 'tanque.jpg', ST_SetSRID(ST_MakePoint(-50.3223664, -27.8139213), 4326));
insert into place values (DEFAULT, 'Aeroporto Federal Antonio Correia Pinto de Macedo', 'Aeroporto', 'aeroporto.jpg', ST_SetSRID(ST_MakePoint(-50.2798688, -27.7821405), 4326));
insert into place values (DEFAULT, 'LAGES GARDEN SHOPPING', 'LAGES GARDEN SHOPPING', 'lages_garden.jpg', ST_SetSRID(ST_MakePoint(-50.2833509, -27.7926552), 4326));
insert into place values (DEFAULT, 'IFSC Câmpus Lages', 'Instituição educacional', 'ifsc_lages.jpg', ST_SetSRID(ST_MakePoint(-50.3375802, -27.8052849), 4326));
insert into place values (DEFAULT, 'Terminal Rodoviário de Lages', 'Serviço de transporte', 'terminal_rodoviario_lages.jpg', ST_SetSRID(ST_MakePoint(-50.3150285, -27.8206004), 4326));
insert into place values (DEFAULT, 'Monumento Carro de Molas', 'Marco histórico', 'molas.jpg', ST_SetSRID(ST_MakePoint(-50.3285084, -27.8127163), 4326));
insert into place values (DEFAULT, 'Praça João Costa', 'Praça', 'praca_joao.jpg', ST_SetSRID(ST_MakePoint(-50.3272538, -27.8152191), 4326));
insert into place values (DEFAULT, 'Museu Histórico Thiago de Castro', 'Museu histórico local', 'museu_thiago_castro.jpg', ST_SetSRID(ST_MakePoint(-50.3276031, -27.8178288), 4326));
insert into place values (DEFAULT, 'Catedral Diocesana Nossa Senhora dos Prazeres', 'Catedral', 'catedral.JPG', ST_SetSRID(ST_MakePoint(-50.3257996, -27.816829), 4326));
insert into place values (DEFAULT, 'Prefeitura Municipal de Lages', 'Prefeitura', 'prefeitura.PNG', ST_SetSRID(ST_MakePoint(-50.326037, -27.8170034), 4326));
insert into place values (DEFAULT, 'Angeloni Lages - Supermercado', 'Supermercado', 'angeloni_lages.jpg', ST_SetSRID(ST_MakePoint(-50.3212101, -27.8120908), 4326));
insert into place values (DEFAULT, 'UDESC', 'Universidade', 'CAV.jpg', ST_SetSRID(ST_MakePoint(-50.3066709, -27.7927336), 4326));
insert into place values (DEFAULT, 'Morro da Cruz', 'Destino religioso', 'morro_cruz.jpg', ST_SetSRID(ST_MakePoint(-50.3296938, -27.834878), 4326));
insert into place values (DEFAULT, 'Praça Ivandel Xavier Soares', 'Parque', 'praca_ivandel.jpg', ST_SetSRID(ST_MakePoint(-50.3365232, -27.8232505), 4326));
insert into place values (DEFAULT, 'Orion Parque', 'Associação ou organização', 'orion.JPG', ST_SetSRID(ST_MakePoint(-50.3371155, -27.8018589), 4326));
insert into place values (DEFAULT, 'Praça da Bandeira', 'Praça top', 'praca_bandeira.jpg', ST_SetSRID(ST_MakePoint(-50.3223433, -27.8100775), 4326));
