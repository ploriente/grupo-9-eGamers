// 1. Guardar al usuario en la BD
// 2. Buscar al usuario que se quiere loguear o su email
// 3. Buscar a un usuario por su ID.
// 4. Editar la informacion de un usuario.
// 5. Eliminar a un usuario de la BD

//Se guarda en mayuscula por convencion
const path = require("path");

const fs = require("fs");

const User = {
    fileName: "../data/users.json", //aca iran todos los datos de los usuarios

    getData:function () {//devuelve todos los datos
        return JSON.parse(fs.readFileSync(path.join(__dirname, "../data/users.json" ), "utf-8"));
        
    }, //Para convertir toda la info en un array

    generateId: function() {//Metodo que genera el id}
        let allUsers = this.findAll(); //Contar todos los users
        let lastUser = allUsers.pop(); //Obtengo el ultimo usuario
        if(lastUser){
            return lastUser.id + 1; //tiene que usar un if porque puede que el json este vacio
        }
        return 1;
    },

    findAll : function(){//este tambien devuelve todos los datos
        return this.getData();
    },

    findbyPk : function(id) {//Encontrar un usuario por su ID(clavePrimaria)
        let allUsers = this.findAll(); // Todos los usuarios en formato de array
        let userFound = allUsers.find(oneUser => oneUser.id === id);//de aquel usuarui retorname ese con el mismo ID
        return userFound; //ej console.log(User.findByPk(2))
    },
    findByField: function (field, text){
       let allUsers = this.findAll();
       let userFound = allUsers.find(oneUser => oneUser[field] === text);
       return userFound
    },

    create: function(userData) {
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(path.join(__dirname, "../data/users.json" ), JSON.stringify(allUsers,null, " "));
        return newUser;
    },


    delete: function(id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !==id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, " "));
        return true
    }

}

module.exports = User;

