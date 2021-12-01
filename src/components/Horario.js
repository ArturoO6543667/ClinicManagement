import axios from "axios";
export default {
    name: 'Horario',
    data: () => ({
        headers: [{
                text: "Dia",
                align: "start",
                sortable: true,
                value: "dia",
            },
            { text: "Hora inicio", value: "horaInicio" },
            { text: "Hora fin", value: "horaFin" },

            { text: "Actions", value: "actions", sortable: false },
        ],
        dias: [],
        dia: {},
        paginacion: {},
        url: "https://clinicmanagementwebservice20211116223102.azurewebsites.net",
        nuevoHorario: false,
        modalHorario: false,
        horarios: [],
        horario: {},
        search: '',
        dialogDelete: false,
    }),
    methods: {
        aplicarBusqueda() {
            console.log("busqueda..", this.search);
            this.listDia();
        },
        listDia() {
            axios
                .get(this.url + "/api/v1/Dia", {
                    params: {
                        version: "1",
                        PageSize: this.paginacion.filasPorPagina,
                        PageNumber: this.paginacion.pagina,
                        Search: this.search,
                    },
                })
                .then((response) => {
                    let respuesta = response.data;
                    this.dias = respuesta.rows;
                    console.log("Esta es la respuesta del servidor", respuesta);
                    this.paginacion.paginas = respuesta.totalPages;
                    this.paginacion.pagina = respuesta.currentPage;
                    this.paginacion.filasPorPagina = respuesta.pageSize;
                })
                .catch((error) => {
                    console.log("Ocurrio un error", error);
                });
        },
        listHorario() {
            axios
                .get(this.url + "/api/v1/Horario", {
                    params: {
                        version: "1",
                        PageSize: 100,
                    },
                })
                .then((response) => {
                    let respuesta = response.data;
                    this.horarios = respuesta.rows;
                    console.log("Esta es la respuesta del servidor", respuesta);
                })
                .catch((error) => {
                    console.log("Ocurrio un error", error);
                });
        },

        saveDia() {

            axios
                .post(this.url + "/api/v1/Dia", this.dia)
                .then((response) => {
                    let respuesta = response.data;
                    console.log(
                        "Esta es la respuesta del servidor en el store",
                        respuesta
                    );
                    this.dia = {};
                    /*
                    this.diaDoctor.diaKey = respuesta.key;
                    this.diaDoctor.doctorKey = this.editedItem.key;
                    this.saveDiaDoctor();
                    */
                    this.NuevoHorario = false;
                })
                .catch((error) => {
                    console.log("Ocurrio un error", error.response);
                    //let arrayErrores = error.response.data;
                    this.errores = {};


                });

            /* this.NuevoHorario = false; */
        },
        saveHorario() {
            axios
                .post(this.url + "/api/v1/Horario", this.horario)
                .then((response) => {
                    let respuesta = response.data;
                    console.log(
                        "Esta es la respuesta del servidor en el store",
                        respuesta
                    );
                    this.horario = {};
                    this.listHorario();
                    /*
                    this.diaDoctor.diaKey = respuesta.key;
                    this.diaDoctor.doctorKey = this.editedItem.key;
                    this.saveDiaDoctor();
                    */
                })
                .catch((error) => {
                    console.log("Ocurrio un error", error.response);
                    //let arrayErrores = error.response.data;
                    this.errores = {};


                });

            this.modalHorario = false;
        },
        /*  verItem() {
             return "Hola";
         }, */
        /*         editItem() {
                    return "Hola 2";
                }, */
        deleteItem() {
            return "ke tal";
        },


        filasPorPaginaHandler() {
            return "lol";
        },
        cambioDePaginaHandler(numPag) {
            console.log("pagina", numPag);
            this.paginacion.pagina = numPag;
            this.listDia();
        },
    },
    created() {
        //this.initialize();
        this.listDia();
        this.listHorario();
    },
}