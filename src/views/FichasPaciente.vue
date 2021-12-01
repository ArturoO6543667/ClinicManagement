<template>
    <div class="fondo">
        <center><h2 class="color">Estas son sus fichas médicas</h2></center>
        <!-- <v-select
            :items="[
                'LUNES',
                'MARTES',
                'MIERCOLES',
                'JUEVES',
                'VIERNES',
                'SABADO',
                'DOMINGO',
            ]"
            filled
            label="DiA"
            v-model="Search"
            @change="listFichasPaciente"
        ></v-select> -->
        <v-row dense>
            <v-col cols="4" v-for="fp in fichasPaciente" :key="fp.key">
                <v-card
                    color="#FF7800"
                    dark
                    v-bind:class="[fp.estado == 'OCUPADO' ? 'ocupado' : '']"
                    v-if="fp.estado != 'CANCELADO'"
                >
                    <v-card-title class="text-h5">
                        {{ fp.fecha }} <br />
                        {{ fp.horario }}<br />
                        {{ fp.estado }}<br />
                        <br />
                    </v-card-title>

                    <v-card-subtitle>
 <!--                        <span>
                            <b>Dia:</b>
                            {{ fp.dia }}
                        </span> -->
                        <br />
                        <span>
                            <b>Doctor: </b>
                            {{ fp.nombreDoctor }}
                        </span>
                        <br />
<!--                         <span>
                            <b>Especialidad:</b>
                            {{ fp.especialidad }}
                        </span> -->
                    </v-card-subtitle>

                    <v-card-actions>
                        <div class="separar">
                            <v-btn text @click="calificarFicha(fp)">
                                Calificar
                            </v-btn>
                            <v-btn text @click="cancelarFicha(fp)">
                                Cancelar Ficha
                            </v-btn>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog
            transition="dialog-bottom-transition"
            v-model="modalCalificar"
        >
            <v-card>
                <v-card-title> Calificar la atencion </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                                v-model="calificacion.calificacion"
                                hide-details
                                single-line
                                type="number"
                            />
                        </v-col>
                    </v-row>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="calificarDoctor"
                        >
                            Calificar
                        </v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-dialog>
        <br />
    </div>
</template>

<script>
import Swal from "sweetalert2/dist/sweetalert2.js";
import axios from "axios";
export default {
    name: "FichasPaciente",
    data() {
        return {
            usuario: {},
            logueado: false,
            filtros: {},
            Search: "",
            doctores: [],
            fichasPaciente: [],
            doctor: {},
            verDoctor: false,
            ficha: {},
            url: "https://clinicmanagementwebservice20211116223102.azurewebsites.net",
            modalCalificar: false,
            calificacion: {},
        };
    },
    methods: {
        listFichasPaciente() {
            axios
                .get(
                    "https://clinicmanagementwebservice20211116223102.azurewebsites.net/api/v1/Fichas",
                    {
                        params: {
                            version: "1",
                            PageSize: 1000,
                            PageNumber: 1,
                            Search: this.Search,
                        },
                    }
                )
                .then((response) => {
                    let respuesta = response.data;
                    this.fichasPaciente = respuesta.rows;
                })
                .catch((error) => {
                    console.log("Ocurrio un error", error);
                });
        },
        listDoctores() {
            axios
                .get(this.url + "/api/v1/Doctor", {
                    params: {
                        version: "1",
                        PageSize: 1000,
                        PageNumber: 1,
                    },
                })
                .then((response) => {
                    let respuesta = response.data;
                    this.doctores = respuesta.rows;
                })
                .catch((error) => {
                    console.log("Ocurrio un error", error);
                });
        },
        mostrarDoctor(doctor) {
            console.log("Este es el doctor", doctor);
            this.doctor = doctor;
            this.verDoctor = true;
        },
        calificarFicha(item) {
            if (!this.usuario.key) {
                Swal.fire({
                    icon: "error",
                    title: "Debe iniciar sesion",
                    text: "Para realizar su reserva debe iniciar sesion",
                });
            }
            this.modalCalificar = true;
            console.log(item);
            this.ficha = item;
        },
        calificarDoctor() {
            this.calificacion.pacienteKey = this.usuario.key;
            this.calificacion.iddoctor = this.ficha.idDoctor;
            this.calificacion.idFicha = this.ficha.fichasId;
            this.calificacion.calificacion = parseInt(
                this.calificacion.calificacion
            );

            axios
                .post(this.url + "/api/v1/Evaluacion", this.calificacion)
                .then((response) => {
                    let respuesta = response.data;
                    this.ficha = respuesta;
                    console.log(respuesta);
                    this.listFichasPaciente();
                    this.modalCalificar = false;
                    this.calificacion.calificacion = "";
                })
                .catch((error) => {
                    console.log("Ocurrio un error", error.response);
                    //let arrayErrores = error.response.data;
                    this.errores = {};
                });
        },
        cancelarFicha(item) {
            console.log("Cancelar la ficha");
            let params = {
                id: item.fichasId,
                estado: "cancelado",
            };
            axios
                .put(this.url + "/api/v1/Fichas?key=" + item.fichasId, params)
                .then((response) => {
                    let respuesta = response.data;
                    this.ficha = respuesta;
                    console.log(respuesta);
                    this.listFichasPaciente();
                })
                .catch((error) => {
                    console.log("Ocurrio un error", error.response);
                    //let arrayErrores = error.response.data;
                    this.errores = {};
                });
        },
        generarQR() {
            console.log("QR");
            console.log(this.ficha);
        },
    },
    created() {
        this.listDoctores();
        this.listFichasPaciente();

        this.usuario = JSON.parse(localStorage.getItem("Usuario"));
        if (this.usuario == null) {
            this.usuario = {};
            this.logueado = false;
        } else {
            this.logueado = true;
        }
        // this.initialize();
    },
};
</script>

<style scoped>
.separar {
    display: flex;
    justify-content: space-between;
}
.fondo {
    background: #444444;
    height: 530px;
    margin: 0px;
    padding: 0px;
    height: 500px;
    border: 0px;
}

.ocupado {
    background-color: rgb(255 127 0) !important;
}
.color{
    color:white;
}
</style>