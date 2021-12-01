<template>
<div>
    <v-data-table
        :headers="headers"
        :items="dias"
        :hide-default-footer="true"
        class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat>
                <!-- <v-toolbar-title>BUSCADOR</v-toolbar-title> -->
                <v-text-field
                    v-model="search"
                    label="Buscar"
                    class="mx-4 my-4"
                ></v-text-field>
                <v-btn color="primary" @click="aplicarBusqueda"
                    >Buscar</v-btn
                >

                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="nuevoHorario= true">
                    Nuevo horario
                </v-btn>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
        <!--     <p @click="verItem(item.key)">Ver</p> -->
         <!--    <v-icon small class="mr-2" @click="editItem(item.key)">
                mdi-pencil
            </v-icon> -->
            <v-icon small @click="deleteItem(item)">
                mdi-delete
            </v-icon>
        </template>
    </v-data-table>
    <!---  PAGINACION --->
    <div class="text-xs-center pt-2 md4 lg4">
        <!-- I removed v-model and added @input and :value -->
        <div class="form-group col-4">
            <label> Resultados por pagina</label>
            <select
                class="form-control"
                style="width: 50px; border: 1px solid black"
                v-model="paginacion.filasPorPagina"
                @change="filasPorPaginaHandler()"
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
            </select>
        </div>

        <v-pagination
            @input="cambioDePaginaHandler"
            :value="paginacion.pagina"
            :length="paginacion.paginas"
        ></v-pagination>
    </div>

    <!---  MODAL NUEVO / EDITARr horario --->
    <v-dialog
        transition="dialog-bottom-transition"
        max-width="1000"
        v-model="nuevoHorario"
    >
        <v-card>
            <v-card-title>  nuevo horario</v-card-title>
            <v-card-text>
                <h4>Elija el dia:</h4>

                <v-row>
                    <v-col>
                        Elija dia
                        <v-select
                            :items="['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']"
                            filled
                            label="Dia"
                            v-model="dia.diaSemana"
                            item-value='key'
                            item-text='nombreEspecialidad'
                        >
                        
                        </v-select>

                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        Elija el Horario
                        <v-select
                            :items="horarios"
                            filled
                            label="Horario"
                            v-model="dia.horarioKey"
                            item-value='key'
                        >
                            <template v-slot:selection="{ item }">
                                {{ item.horaInicio }} - {{ item.horaFin }}
                            </template>
                            <template v-slot:item="{ item }">
                                {{ item.horaInicio }} - {{ item.horaFin }}
                            </template>
                        
                        </v-select>
                        <button @click="modalHorario = true">Nuevo Horario</button>
                    </v-col>
                </v-row>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="nuevoHorario = false"
                    >
                        Cancelar
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="saveDia"
                    >
                        Guardar
                        
                    </v-btn>
                </v-card-actions>

                <!-- <v-row>
                    <v-col cols="12">
                        <v-btn color="blue darken-1" text @click="save">
                        </v-btn>
                    </v-col>
                </v-row> -->
            </v-card-text>
        </v-card>
    </v-dialog>
    <v-dialog
        transition="dialog-bottom-transition"
        max-width="1000"
        v-model="modalHorario"
    >
        <v-card>
            <v-card-text>
                <h4>Crear nuevo horario</h4>
                <v-text-field
                    v-model="horario.horaInicio"
                    label="Hora Inicio"
                ></v-text-field>
                <v-text-field
                    v-model="horario.horaFin"
                    label="Hora Fin"
                ></v-text-field>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="modalHorario = false"
                    >
                        Cancelar
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="saveHorario"
                    >
                        Guardar
                    </v-btn>
                </v-card-actions>
            </v-card-text>
        </v-card>
    </v-dialog>


 <!--    colocado por mi -->
    <v-dialog
            transition="dialog-bottom-transition"
            max-width="1000"
            v-model="modalBorrarHorarioo"
        >
            <v-card>
                <v-card-title> Esta seguro de borrar al Horario? </v-card-title>
                <v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="modalBorrarHorario = false"
                        >
                            Cancelar
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="deleteItemConfirm"
                        >
                            Confirmar
                        </v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- mio -->
</div>
</template>
<script src="./Horario.js"></script>