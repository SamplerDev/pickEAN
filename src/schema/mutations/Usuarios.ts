import { GraphQLString, GraphQLBoolean, GraphQLID, GraphQLInputObjectType, GraphQLInt } from 'graphql'
import bcrypt from "bcryptjs"
import { Usuarios } from '../../Entities/Usuario' //importando esto me permite interactuar con la entidad/tablai
import { MessageType } from '../../TypeDefs/MsgType'
import { Cuentas } from '../../Entities/Cuentas'
import { Apps } from '../../Entities/Apps'
import { UsuarioType } from '../../TypeDefs/Usuario'

export const CREATE_USER = {

  type: MessageType, //tipo de dato que devuelve
  args: {
    IdApp: { type: GraphQLID },
    IdCuenta: { type: GraphQLID },
    Usuario: { type: GraphQLString },
    Pwd: { type: GraphQLString },
    Admin: { type: GraphQLBoolean },
    ConfirmIdCuenta: { type: GraphQLInt },
    ConfirmIdApp: { type: GraphQLInt }


  },
  async resolve(_: any, args: any) {


    const { IdApp, IdCuenta, ConfirmIdCuenta, ConfirmIdApp } = args
    const validacion1 = await Usuarios.findOne({ where: { Usuario: args.Usuario } })

    if (!validacion1) {
      const validacion2 = IdCuenta == ConfirmIdCuenta && IdApp == ConfirmIdApp ? true : false;
      if (validacion2) {
        const validacion3 = await Cuentas.findOne({ where: { id: args.IdCuenta } })
        if (validacion3) {
          const validacion4 = await Cuentas.findOne({ where: { id: args.IdApp } })
          if (validacion4) {

            const { IdApp, IdCuenta, Usuario, Pwd, Admin } = args
            const encryptPassword = await bcrypt.hash(Pwd, 10);
            const result = await Usuarios.insert({
              /* IdApp: IdApp,
               IdCuenta: IdCuenta,*/
              Usuario: Usuario,
              Pwd: encryptPassword,
              Admin: Admin,
              IdApp: IdApp,
              IdCuenta: IdCuenta,
              ConfirmIdApp: ConfirmIdApp,
              ConfirmIdCuenta: ConfirmIdCuenta
            })

            console.log(result)
            const AppName = await Apps.findOne({ where: { id: args.IdApp } })
            const CuentaName = await Cuentas.findOne({ where: { id: args.idCuenta } })
            return {
              success: true,
              message: `El usuario ${Usuario} para la app ${AppName?.Name}, cuenta ${CuentaName?.Name} ha sido creado con el id:${result.identifiers[0].id} `
            }
          } else {
            return {
              success: false,
              message: `el ID de la App que ingreso no existe `
            }
          }
        } else {
          return {
            success: false,
            message: `el ID de la Cuenta que ingreso no existe `
          }
        }
      } else {
        return {
          success: false,
          message: 'la id app/cuenta no coincide con su confirmacion, reviselo '
        }
      }
    }
    else {
      return {
        success: false,
        message: `el nombre de Usuario: ${args.Usuario} ya ha sido tomado, intente con otro `
      }

    }

  }
}


export const LOGIC_DELETEUSER = {


  type: GraphQLString,
  args: {
    id: { type: GraphQLID },
    IdApp: { type: GraphQLInt },
    IdCuenta: { type: GraphQLInt },
    Usuario: { type: GraphQLString },



  },
  async resolve(_: any, args: any) {
    const { id, IdApp, IdCuenta, Usuario } = args

    const userFound = await Usuarios.findOne({ where: { id: id } })
    console.log(userFound)

    if (userFound) {
      if (userFound.Usuario === Usuario) {
        if (userFound.ConfirmIdApp === IdApp) {
          if (userFound.ConfirmIdCuenta === IdCuenta) {

            const response = await Usuarios.update({ id }, {

              Deleted: true

            })
            return `El usuario ${Usuario}, con id: ${id} de ha sido dado de baja exitosamente`
          } else {
            return 'El id de la cuenta no es correcto '
          }


        } else {
          return 'El id de la app no es correcto'
        }
      } else {
        return 'El nombre de Usuario no es correcto'
      }

    } else {

      return 'El id no corresponde a un usuario en base de datos'
    }

    /*  if(userFound===null || userFound.Deleted===true){
          return 'El usuario que quiere borrar no ha sido encontrado o ha sido borrado logicamente con anterioridad'
      }else{
       const response =   await Usuarios.update({id},{
           
          Deleted:true
                 } )

          console.log(response)
          return `El usuario con el id : ${id} ha sido eliminada exitosamente`;
          
      }*/
  }


}



export const UPDATE_USER = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
    input: {
      type: new GraphQLInputObjectType({
        name: "UserInput",
        fields: () => ({
          IdApp: { type: GraphQLInt },
          IdCuenta: { type: GraphQLInt },
          ConfirmIdCuenta: { type: GraphQLInt },
          ConfirmIdApp: { type: GraphQLInt },
          Admin: { type: GraphQLBoolean }



        }),
      }),
    },
  },
  async resolve(_: any, { id, input }: any) {


    const userFound = await Usuarios.findOne({ where: { id: id } });

    if (userFound) {

      //console.log(input.idCuenta,input.IdApp) 

      const cuentaExists = await Cuentas.findOneBy({ id: input.IdCuenta })
      if (cuentaExists) {
        console.log(cuentaExists, input)
        const appExists = await Apps.findOneBy({ id: input.IdApp })
        if (appExists) {

          const confirmCuenta = input.IdCuenta === input.ConfirmIdCuenta

          if (confirmCuenta) {

            const confirmApp = input.IdApp === input.ConfirmIdApp

            console.log(input.IdApp, input.ConfirmIdApp,confirmApp)
            if (confirmApp) {
              const response = await Usuarios.update({ id }, {

                Admin: input.Admin,
                IdApp: input.IdApp,
                IdCuenta: input.idCuenta,
                ConfirmIdApp: input.ConfirmIdApp,
                ConfirmIdCuenta: input.ConfirmIdCuenta


              });

              return {
                success: true,
                message: "Update User successfully",
              };

            } else {
              return {
                success: true,
                message: "el id de la App ingresado no coincide con su confirmacion, reviselo ",
              }

            }

          }
          else {
            return {
              success: true,
              message: "el id de la cuenta ingresado no coincide con su confirmacion, reviselo ",
            }
          }
        } else {
          return {
            success: true,
            message: "La applicacion ingresada no existe, revisela",
          };
        }

      } else {
        return {
          success: true,
          message: "La cuenta ingresada no existe, revisela",
        };

      }

    } else {

      return {
        success: false,
        message: "el id del usuario no ha sido encontrado",
      };

    }






  },
};




export const UPDATE_USER_PASSWORD = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
    input: {
      type: new GraphQLInputObjectType({
        name: "UserInputPwd",
        fields: () => ({

          Pwd: { type: GraphQLString },
          newPassword: { type: GraphQLString },

        }),
      }),
    },
  },
  async resolve(_: any, { id, input }: any) {


    const userFound = await Usuarios.findOne({ where: { id: id } });
    if (userFound) {
      const inputPwd = input.Pwd;
      const userPwd = userFound.Pwd;

      const isMatch = await bcrypt.compare(
        inputPwd as string,
        userPwd as string
      );
      console.log(isMatch)
      if (isMatch) {


        // Hasing the password and deleteting oldPassword and new Password
        const newPassword = await bcrypt.hash(input.newPassword, 10);
        delete input.Pwd


        // Adding passsword to the input for update
        input.Pwd = newPassword;

        const response = await Usuarios.update({ id }, {

          Pwd: input.Pwd,



        })

        return {
          success: true,
          message: "Update User successfully",
        };

        ;
      } else {
        return {
          success: false,
          message: "La password ingresada no coincide con la registrada en el sistema, revisela",
        };

        //else de la password
      }

    } else {

      return {
        success: false,
        message: "el id del usuario no ha sido encontrado",
      };
      //else de UserFound
    }





    //if (response.affected === 0) return { message: "User not found" };


  },
};


