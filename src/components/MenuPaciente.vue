<template>
    <div class="contenedor">
        <div class="contenedorLogo">
            <img src="../assets/logo_alemana.png" alt="" />
        </div>
        <div class="contenedorBotones">
            <router-link :to="{ name: 'Inicio' }" class="linea">INICIO</router-link>
            <router-link :to="{ name: 'Institucion' }" class="linea">
                INSTITUCIÓN</router-link>
            <router-link :to="{ name: 'Informacion' }" class="linea">INFORMACIÓN</router-link>
            <!--   <a>Información</a> -->
            <!--      <a>Contacto</a> -->
            <router-link :to="{ name: 'Ubicacion' }" class="linea">UBICACIÓN</router-link>
            <router-link :to="{ name: 'Login' }" v-show="!logueado" class="linea_1">
                <v-btn color="info"> LOGIN </v-btn>
            </router-link>
            <a v-show="!logueado" @click="abrirRegistro()">
                <v-btn color="amber darken-2">REGISTRARSE</v-btn>
            </a>
            <v-menu offset-y v-if="logueado">
                <template v-slot:activator="{ attrs, on }">
                    <v-btn
                        color="primary"
                        class="white--text ma-5"
                        v-bind="attrs"
                        v-on="on"
                    >
                        {{ usuario.nombre + " " + usuario.apellidoPaterno }}
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item link>
                        <router-link
                            :to="{ name: 'Home' }"
                            v-show="usuario.rol == 1"
                        >
                            <v-list-item-title>Administrador</v-list-item-title>
                        </router-link>
                    </v-list-item>
                    <v-list-item link>
                        <v-list-item-title @click="verFichas()"
                            >Ver mis fichas</v-list-item-title
                        >
                    </v-list-item>
                    <v-list-item link>
                        <v-list-item-title @click="cerrarSesion()"
                            >cerrar sesion</v-list-item-title
                        >
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>

        <!-- Modal registrar paciente -->
        <v-dialog
            transition="dialog-bottom-transition"
            max-width="1000"
            v-model="nuevoPaciente"
        >
            <v-card>
                <v-card-title> Registre sus Datos Para su Login</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                                v-model="paciente.nombre"
                                label="Nombre"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="paciente.apellidoPaterno"
                                label="Apellido paterno"
                            ></v-text-field>
                            <v-alert
                                dense
                                outlined
                                type="error"
                                v-show="errores.apellidoPaterno"
                            >
                                {{ errores.apellidoPaterno }}
                            </v-alert>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="paciente.apellidoMaterno"
                                label="Apellido Materno"
                            ></v-text-field>
                            <v-alert
                                dense
                                outlined
                                type="error"
                                v-show="errores.apellidoMaterno"
                            >
                                {{ errores.apellidoMaterno }}
                            </v-alert>
                        </v-col>
                        <!--  <v-col cols="6">
                        <v-text-field
                            v-model="paciente.genero"
                            label="Genero"
                        ></v-text-field>
                    </v-col> -->
                        <v-col cols="6">
                            <v-text-field
                                v-model="paciente.ci"
                                label="CI"
                            ></v-text-field>
                            <v-alert
                                dense
                                outlined
                                type="error"
                                v-show="errores.ci"
                            >
                                {{ errores.ci }}
                            </v-alert>
                        </v-col>
                        <!--  <v-col cols="6">
                            <v-text-field
                                v-model="paciente.FechaNacimiento"
                                label="Fecha de Nacimiento"
                            ></v-text-field>
                            <v-alert
                                dense
                                outlined
                                type="error"
                                v-show="errores.FechaNacimiento"
                            >
                                {{ errores.FechaNacimiento }}
                            </v-alert>
                        </v-col> -->
                        FECHA DE NACIMIENTO
                        <v-col cols="6">
                            <v-date-picker
                                v-model="paciente.fechaNacimiento"
                                label="Fecha de nacimiento"
                            ></v-date-picker>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="paciente.edad"
                                label="Edad"
                            ></v-text-field>
                            <v-alert
                                dense
                                outlined
                                type="error"
                                v-show="errores.edad"
                            >
                                {{ errores.edad }}
                            </v-alert>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="paciente.sexo"
                                label="Sexo"
                            ></v-text-field>
                            <v-alert
                                dense
                                outlined
                                type="error"
                                v-show="errores.sexo"
                            >
                                {{ errores.sexo }}
                            </v-alert>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="paciente.tipoSangre"
                                label="Tipo de Sangre"
                            ></v-text-field>
                            <v-alert
                                dense
                                outlined
                                type="error"
                                v-show="errores.tipoSangre"
                            >
                                {{ errores.tipoSangre }}
                            </v-alert>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="paciente.numTelf"
                                label="Numero de Telefono"
                            ></v-text-field>
                            <v-alert
                                dense
                                outlined
                                type="error"
                                v-show="errores.NumTelf"
                            >
                                {{ errores.NumTelf }}
                            </v-alert>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="paciente.NumCell"
                                label="Numero de celular"
                            ></v-text-field>
                            <v-alert
                                dense
                                outlined
                                type="error"
                                v-show="errores.NumCell"
                            >
                                {{ errores.NumCell }}
                            </v-alert>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="paciente.ocupacion"
                                label="Ocupacion"
                            ></v-text-field>
                            <v-alert
                                dense
                                outlined
                                type="error"
                                v-show="errores.Ocupacion"
                            >
                                {{ errores.Ocupacion }}
                            </v-alert>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="paciente.direccionDomicilio"
                                label="Direccion de Domicilio"
                            ></v-text-field>
                            <v-alert
                                dense
                                outlined
                                type="error"
                                v-show="errores.direccionDomicilio"
                            >
                                {{ errores.direccionDomicilio }}
                            </v-alert>
                        </v-col>

                        <v-col cols="6">
                            <v-text-field
                                v-model="paciente.nombreContactoEmergencia"
                                label="Nombre de Contacto de Emergencia"
                            ></v-text-field>
                            <v-alert
                                dense
                                outlined
                                type="error"
                                v-show="errores.nombreContactoEmergencia"
                            >
                                {{ errores.nombreContactoEmergencia }}
                            </v-alert>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="paciente.telfContactoEmergencia"
                                label="Telefono de Emergencia"
                            ></v-text-field>
                            <v-alert
                                dense
                                outlined
                                type="error"
                                v-show="errores.telfContactoEmergencia"
                            >
                                {{ errores.telfContactoEmergencia }}
                            </v-alert>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="paciente.email"
                                label="Correo Electronico"
                            ></v-text-field>
                            <v-alert
                                dense
                                outlined
                                type="error"
                                v-show="errores.email"
                            >
                                {{ errores.email }}
                            </v-alert>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                :type="'password'"
                                v-model="paciente.contraseña"
                                label="Contraseña"
                            ></v-text-field>
                            <v-alert
                                dense
                                outlined
                                type="error"
                                v-show="errores.contraseña"
                            >
                                {{ errores.contraseña }}
                            </v-alert>
                        </v-col>

                        <!-- <v-col cols="6">
                        
                        <v-select
                            :items="especialidades"
                            filled
                            label="Especialidades"
                            v-model="paciente.especialidadKey"
                            item-value='key'
                            item-text='nombreEspecialidad'
                        ></v-select>
                    </v-col> -->
                    </v-row>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="nuevoPaciente = false"
                        >
                            Cancelar
                        </v-btn>

                        <v-btn
                            color="blue darken-1"
                            text
                            @click="guardarPaciente"
                        >
                            Guardar
                        </v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "MenuPaciente",
    methods: {
        cerrarSesion() {
            console.log("se cerro sesion");
            localStorage.clear();
            this.usuario = {};
            this.logueado = false;
            this.$router.push({ name: "Inicio" });
        },
        verFichas() {
            this.$router.push({ name: "FichasPaciente" });
        },
        abrirRegistro() {
            this.$emit("toggleRegistro", "valorr");
            this.nuevoPaciente = !this.nuevoPaciente;
        },
        guardarPaciente() {
            this.paciente.version = "1";
            axios
                .post(
                    "https://clinicmanagementwebservice20211116223102.azurewebsites.net/api/v1/Paciente",
                    this.paciente
                )
                .then((response) => {
                    let respuesta = response.data;
                    console.log(
                        "Esta es la respuesta del servidor en el store",
                        respuesta
                    );

                    this.paciente = {};
                    this.nuevoPaciente = false;
                })
                .catch((error) => {
                    this.errores = {};
                    console.log("Ocurrio un error", error.response);
                    let errores = error.response.data;
                    errores.forEach((element) => {
                        this.errores[element.propertyName] =
                            element.errorMessage;
                    });

                    // this.errores = {};
                });
            this.nuevoDoctor = false;
        },
    },
    data() {
        return {
            usuario: {},
            logueado: false,
            nuevoPaciente: false,
            paciente: {},
            errores: {},
        };
    },
    mounted() {
        this.usuario = JSON.parse(localStorage.getItem("Usuario"));
        if (this.usuario == null) {
            this.usuario = {};
            this.logueado = false;
        } else {
            this.logueado = true;
        }
    },
};
</script>

<style scoped>
.contenedor {
    /* background-color: brown; */
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    background: black;
    margin: 0px;
    border: 0px;
    padding: 0px;
}

.contenedorLogo img {
    height: 100%;
    width: auto;
}

.contenedorBotones {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    text-decoration: none;
    /* background-color: darkblue; */
}
.linea{
    text-decoration: none;
}
.linea_1{
    text-decoration: none;
}
.linea:hover{
    background-color: orange;
    border-radius: 20px;
    padding:10px;
}

.contenedorBotones a {
    margin: 0px 15px 0px 15px;
    color: white;
}
</style>