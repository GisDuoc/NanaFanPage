import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx'; 
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Character } from './character';


@Injectable({
  providedIn: 'root'
})
export class DbService {
  private database: SQLiteObject | null = null;
  private dbLista: BehaviorSubject<boolean> = new BehaviorSubject(false); //observable //Guarda un valor actual //Notifica a los suscriptores cuando cambia el valor.

  constructor(
    private platform: Platform,
    private sqlite: SQLite
  ) { 
    console.log("test")
    this.crearBD();
  }

  //CREAR BASE DE DATOS 
  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({ 
        name: 'characters.db',
        location: 'default' 
      }).then((db: SQLiteObject) => {
        console.log('this.sqlite', this.sqlite);
        this.database = db;
        console.log("BD Creada");
        this.crearTablas();
      }).catch((e) => {
        this.dbLista.next(false);
        console.log("Error al crear DB: " + e); 
      })
    });
  }

  dbState() {
    return this.dbLista;
  }
  
//CREAR TABLAS 
async crearTablas() {
  if(this.database != null){
    let tablaUser = "CREATE TABLE IF NOT EXISTS user(username VARCHAR(50) PRIMARY KEY, password VARCHAR(50) NOT NULL);"
    let tablaCharacters =  "CREATE TABLE IF NOT EXISTS character(id INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL, banda VARCHAR(50) NOT NULL, rol VARCHAR(50) NOT NULL, personalidad VARCHAR(50) NOT NULL, descripcion VARCHAR(200) NOT NULL, imagen VARCHAR(200) NOT NULL, user VARCHAR(50) NOT NULL, FOREIGN KEY(user) REFERENCES user(username));"
  
     let data = [
        "INSERT OR IGNORE INTO user(username, password) VALUES ('admin', 'Admin123@');",
        "INSERT OR IGNORE INTO character( id, nombre, banda, rol, personalidad, descripcion, imagen, user) VALUES (1, 'Nana Osaki', 'Black Stones (Blast)', 'Vocalista', 'Fuerte, independiente, apasionada', 'Una joven cantante punk decidida a triunfar en la música mientras lidia con su pasado y su dependencia emocional.', 'assets/nana_osaki.jpg','admin');",
        "INSERT OR IGNORE INTO character( id, nombre, banda, rol, personalidad, descripcion, imagen, user) VALUES (2, 'Nana Komatsu', 'No pertenece a ninguna', 'Amiga de Nana Osaki', 'Insegura, emocional, romántica', 'Conocida como Hachi, es una chica inocente y soñadora que busca amor y estabilidad emocional.', 'assets/nana_komatsu.jpg','admin');",
        "INSERT OR IGNORE INTO character( id, nombre, banda, rol, personalidad, descripcion, imagen, user) VALUES (3, 'Ren Honjo', 'Trapnest', 'Guitarrista', 'Callado, misterioso, rebelde', 'Exbajista de Blast y actual guitarrista de Trapnest. Está en una relación complicada con Nana Osaki.', 'assets/ren_honjo.jpg','admin');",
        "INSERT OR IGNORE INTO character( id, nombre, banda, rol, personalidad, descripcion, imagen, user) VALUES (4, 'Takumi Ichinose', 'Trapnest', 'Bajista, líder de la banda', 'Calculador, manipulador, protector', 'Miembro influyente de Trapnest. Tiene una relación muy controvertida con Hachi.', 'assets/takumi_ichinose.jpg','admin');",
        "INSERT OR IGNORE INTO character( id, nombre, banda, rol, personalidad, descripcion, imagen, user) VALUES (5, 'Nobu Terashima', 'Black Stones (Blast)', 'Guitarrista', 'Alegre, leal, romántico', 'Mejor amigo de Nana Osaki y enamorado de Hachi. Siempre intenta mantener un ambiente positivo en la banda.', 'assets/nobu_terashima.jpg','admin');",
        "INSERT OR IGNORE INTO character( id, nombre, banda, rol, personalidad, descripcion, imagen, user) VALUES (6, 'Shinichi Okazaki', 'Black Stones (Blast)', 'Bajista', 'Maduro para su edad, misterioso', 'El miembro más joven de Blast. Tiene una vida complicada a pesar de su apariencia despreocupada.', 'assets/shin_okazaki.jpg','admin');",
        "INSERT OR IGNORE INTO character( id, nombre, banda, rol, personalidad, descripcion, imagen, user) VALUES (7, 'Reira Serizawa', 'Trapnest', 'Vocalista', 'Elegante, vulnerable, apasionada', 'Cantante principal de Trapnest, guarda una relación secreta con Shin.', 'assets/reira_serizawa.jpg','admin');",
        "INSERT OR IGNORE INTO character( id, nombre, banda, rol, personalidad, descripcion, imagen, user) VALUES (8, 'Yasu (Yasushi Takagi)', 'Black Stones (Blast)', 'Baterista', 'Maduro, protector, racional', 'Baterista de Blast y figura paterna del grupo. También es abogado.', 'assets/yasu_takagi.jpg','admin');",
        "INSERT OR IGNORE INTO character( id, nombre, banda, rol, personalidad, descripcion, imagen, user) VALUES (9, 'Shoji Endo', 'No pertenece a ninguna', 'Exnovio de Hachi', 'Serio, inseguro, distante', 'Exnovio de Hachi, a quien engañó con Sachiko tras mudarse a Tokio. Su historia marca el quiebre emocional de Hachi.', 'assets/shoji_endo.jpg','admin');",
        "INSERT OR IGNORE INTO character( id, nombre, banda, rol, personalidad, descripcion, imagen, user) VALUES (10, 'Sachiko Kawamura', 'No pertenece a ninguna', 'Amante de Shoji', 'Tranquila, dulce, aparentemente inocente', 'Estudiante de arte que comienza una relación con Shoji mientras él aún estaba con Hachi. Su presencia provoca una ruptura definitiva.', 'assets/sachiko_kawamura.jpg','admin');"
      ];

      try {
        await this.database.executeSql(tablaUser, []);
        await this.database.executeSql(tablaCharacters, []);

   for(let i in data) {
          await this.database.executeSql(data[i], []);
          console.log("listo " + i)
        }


        console.log("Tabla Creada");
        this.dbLista.next(true);
      }
            catch (error) {
        console.error(error);
      } 
  }  else {
    this.dbLista.next(false);
  }
}

//EXISTE USUARIO 
async existeUsuario(username: string, password: string) {
  if (this.database != null) {
    const res = await this.database.executeSql(
      `SELECT * FROM user WHERE username = ? AND password = ?;`,
      [username, password]
    );
    return res.rows.length > 0;
  }
  return false;
}

//BUSCAR PERSONAJE 
async buscarPersonajeDeUsuario(username: string) {
  if (this.database != null) {
    const res = await this.database.executeSql(
      `SELECT * FROM character WHERE user = ?;`,
      [username]
    );

    const characters: Character[] = [];

    for (let i = 0; i < res.rows.length; i++) {
      characters.push({
        id: res.rows.item(i).id,
        nombre: res.rows.item(i).nombre,
        banda: res.rows.item(i).banda,
        rol: res.rows.item(i).rol,
        personalidad: res.rows.item(i).personalidad,
        descripcion: res.rows.item(i).descripcion,
        imagen: res.rows.item(i).imagen,
        user: res.rows.item(i).user
      });
    }

    return characters;
  }
  return [];
}


}


 