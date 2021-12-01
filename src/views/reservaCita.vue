<template>
    <div class="fondo">
  <br>
  <br>
        <div>
            <center><h2>SELECCIONE POR DIAS O A SU DOCTOR RECOMENDADO</h2></center>
        </div>
        <br>
        <br />
        <h5>Seleccione el dia en el que quiere hacer su reserva</h5>
        <v-select
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
            @change="listHorariosDisponibles"
        ></v-select>
        <h5>Seleccione el Doctor recomendado</h5>
        <v-select
            :items="doctores"
            filled
            label="Doctores"
            v-model="Search"
            item-value="nombreCompleto"
            @change="listHorariosDisponibles"
        >
            <template v-slot:selection="{ item }">
                {{ item.nombreCompleto }} - {{ item.nombreEspecialidad }}
            </template>
            <template v-slot:item="{ item }">
                {{ item.nombreCompleto }} - {{ item.nombreEspecialidad }}
            </template>
        </v-select>
        <v-row dense>
            <v-col cols="4" v-for="hd in horariosDisponibles" :key="hd.key">
                <v-card
                    color="#444444"
                    dark
                    v-bind:class="[hd.estado == 'OCUPADO' ? 'ocupado' : '']"
                >
                    <v-card-title class="text-h5">
                        {{ hd.fecha }} <br />
                        {{ hd.horario }}
                    </v-card-title>

                    <v-card-subtitle>
                        <span>
                            <b>Dia:</b>
                            {{ hd.dia }}
                        </span>
                        <br />
                        <span>
                            <b>Doctor: </b>
                            {{ hd.nombreDoctor }}
                        </span>
                        <br />
                        <span>
                            <b>Especialidad:</b>
                            {{ hd.especialidad }}
                        </span>
                    </v-card-subtitle>

                    <v-card-actions>
                        <v-btn text @click="reservarHorario(hd)">
                            Resevar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <br />
    </div>
</template>

<script>
import Swal from "sweetalert2/dist/sweetalert2.js";
import axios from "axios";
export default {
    name: "reservaCita",
    data() {
        return {
            usuario: {},
            logueado: false,
            filtros: {},
            Search: "",
            doctores: [],
            horariosDisponibles: [],
            doctor: {},
            verDoctor: false,
            ficha: {},
            url: "https://clinicmanagementwebservice20211116223102.azurewebsites.net",
        };
    },
    methods: {
        listHorariosDisponibles() {
            axios
                .get(
                    "https://clinicmanagementwebservice20211116223102.azurewebsites.net/api/v1/HorarioDisponible",
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
                    this.horariosDisponibles = respuesta.rows;
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
        reservarHorario(item) {
            if (!this.usuario.key) {
                Swal.fire({
                    icon: "error",
                    title: "Debe iniciar sesion",
                    text: "Para realizar su reserva debe iniciar sesion",
                });
            }
            if (item.estado == "OCUPADO") {
                Swal.fire({
                    icon: "error",
                    title: "El horario ya esta ocupado...",
                    text: "Seleccione otro horario",
                });
            }
            let params = {
                pacienteKey: this.usuario.key,
                horarioDisponibleKey: item.key,
                estado: "pendiente",
            };
            axios
                .post(this.url + "/api/v1/Fichas", params)
                .then((response) => {
                    let respuesta = response.data;
                    this.ficha = respuesta;
                    console.log(respuesta);
                    Swal.fire({
                        title: "Exito!",
                        text: "Se guardo su reserva!",
                        icon: "success",
                        showDenyButton: true,
                        showCancelButton: false,
                        confirmButtonText: "Generar QR",
                        denyButtonText: `Cerrar`,
                        footer: '<a @click="generarQR">QR</a>',
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            console.log("Se generoQR");
                            this.generarQR();
                        } else if (result.isDenied) {
                            console.log("No se genero");
                        }
                    });
                    this.listHorariosDisponibles();
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
.fondo {
    /*  background: #F0A500; */
    height: 530px;
    margin: 0px;
    padding: 0px;
    border: 0px;
}

.ocupado {
    background-color: rgb(115 56 56) !important;
}
</style>