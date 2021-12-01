<template>
    <div>
        <br>
        <center><h4>ADMINISTRACION DE LOS DOCTORES</h4></center>

        <v-app id="inspire">
            <v-data-table
                :headers="headers"
                :items="doctores"
                :hide-default-footer="true"
                class="elevation-1"
            >
                <template v-slot:top>
                    <v-toolbar flat>
                        <!-- <v-toolbar-title>BUSCADOR</v-toolbar-title> -->
               <!--          lo quite la busqueda por habia error por el form data -->
                  <!--       <v-text-field
                            v-model="data"
                            label="Buscar"
                            class="mx-4 my-4"
                        ></v-text-field>
                        <v-btn color="primary" @click="aplicarBusqueda"
                            >Buscar</v-btn
                        > -->

                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-btn color="success" @click="nuevoDoc">
                            Nuevo doctor
                        </v-btn>
                    </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                    <p @click="verItem(item.key)">Ver</p>
                    <v-icon small class="mr-2" @click="editItem(item.key)">
                        mdi-pencil
                    </v-icon>
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
        </v-app>
        <!---  MODAL NUEVO / EDITAR DOCTOR --->
        <v-dialog
            transition="dialog-bottom-transition"
            max-width="1000"
            v-model="nuevoDoctor"
        >
            <v-card>
                <v-card-title> Agregar nuevo doctor </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                                v-model="editedItem.nombreCompleto"
                                label="Nombre completo"
                            ></v-text-field>
                            <!-- <span class="rojo">Existe un error aqui</span> -->
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="editedItem.categoria"
                                label="Categoria"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="editedItem.genero"
                                label="Genero"
                            ></v-text-field>
                        </v-col>
                          <v-col cols="6">
                            <v-text-field
                                v-model="editedItem.carnetDeIdentidad"
                                label="CI"
                            ></v-text-field>
                         </v-col>                    
                          <v-col cols="6">
                            <v-text-field
                                v-model="editedItem.direccionDomicilio"
                                label="Direccion De Domicilio"
                            ></v-text-field>
                        </v-col>
                         <v-col cols="6">
                            <v-text-field
                                v-model="editedItem.nroLicencia"
                                label="Numero De Licencia"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="editedItem.telefonoFijo"
                                label="Telefono"
                            ></v-text-field>
                        </v-col>
                        
                        <v-col cols="6">
                            FECHA DE NACIMIENTO
                            <v-date-picker
                                v-model="editedItem.fechaDeNacimiento"
                                label="Fecha de nacimiento"
                            ></v-date-picker>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="editedItem.numeroCelular"
                                label="Numero de Celular"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="editedItem.email"
                                label="Email"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="6">
                            <!-- <v-text-field
                                v-model="editedItem.especialidadKey"
                                label="Especialidad"
                            ></v-text-field> -->
                            <!-- <select v-model="selected">
                                <option v-for="option in options" v-bind:value="option.value">
                                    {{ option.text }}
                                </option>
                            </select> -->
                            <v-select
                                :items="especialidades"
                                filled
                                label="Especialidades"
                                v-model="editedItem.especialidadKey"
                                item-value='key'
                                item-text='nombreEspecialidad'
                            ></v-select>
                        </v-col>
                         <v-col cols="6">
                            <v-file-input
                                accept="image/*"
                                label="Foto del"
                                v-model="editedItem.foto"
                            ></v-file-input>
                        </v-col>
                        <v-col cols="6">
                            <v-select
                                :items="['Activo', 'Inactivo']"
                                filled
                                label="Estado"
                                v-model="editedItem.estado"
                            ></v-select>
                        </v-col>
                        
                        
                    </v-row>

                    <v-row>
                        <div>
                           
                        </div>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-list-item two-line>
                                <v-list-item-content v-for="horario in horariosDoctor" :key="horario.diaDoctorId">
                                    <v-list-item-title>{{horario.diaSemana}}</v-list-item-title>
                                    <v-list-item-subtitle>{{horario.horaInicio}} - {{horario.horaFin}}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-btn
                                color="red darken-1"
                                text
                                @click="modalDias = true"
                            >
                                Editar
                            </v-btn>
                            <v-btn
                                color="red darken-1"
                                text
                                @click="NuevoHorario = true"
                            >
                                Nuevo Horario
                            </v-btn>
                            
                        </v-col>
                    </v-row>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="nuevoDoctor = false"
                        >
                            Cancelar
                        </v-btn>
                        <v-btn
                            v-show="editar"
                            color="blue darken-1"
                            text
                            @click="actualizar"
                        >
                            actualizar
                        </v-btn>
                        <v-btn
                            v-show="!editar"
                            color="blue darken-1"
                            text
                            @click="save"
                        >
                            Guardar
                        </v-btn>
                    </v-card-actions>

                    <v-row>
                        <v-col cols="12">
                            <v-btn color="blue darken-1" text @click="save">
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!---  MODAL CONFIRMAR BORRAR DOCTOR --->
        <v-dialog
            transition="dialog-bottom-transition"
            max-width="1000"
            v-model="modalBorrar"
        >
            <v-card>
                <v-card-title> Esta seguro de borrar al Doctor? </v-card-title>
                <v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="modalBorrar = false"
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
        <!---  MODAL VER DOCTOR --->
        <v-dialog
            transition="dialog-bottom-transition"
            max-width="1000"
            v-model="verDoctor"
        >
            <v-card>
                <v-card-title> Agregar nuevo doctor </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="6">
                            <p>Nombre completo</p>
                            <h4>{{ editedItem.nombreCompleto }}</h4>
                        </v-col>
                        <v-col cols="6">
                            <p>Categoria</p>
                            <h4>{{ editedItem.categoria }}</h4>
                        </v-col>
                        <v-col cols="6">
                            <p>Genero</p>
                            <h4>{{ editedItem.genero }}</h4>
                        </v-col>
                        <v-col cols="6">
                            <p>telefonoFijo</p>
                            <h4>{{ editedItem.telefonoFijo }}</h4>
                        </v-col>
                        <v-col cols="6">
                            <p>fechaDeNacimiento</p>
                            <h4>{{ editedItem.fechaDeNacimiento }}</h4>
                        </v-col>
                        <v-col cols="6">
                            <p>numeroCelular</p>
                            <h4>{{ editedItem.numeroCelular }}</h4>
                        </v-col>
                        <v-col cols="6">
                            <p>email</p>
                            <h4>{{ editedItem.email }}</h4>
                        </v-col>
                        <v-col cols="6">
                            <p>especialidadKey</p>
                            <h4>{{ editedItem.especialidadKey }}</h4>
                        </v-col>
                        <v-col cols="6">
                            <p>estado</p>
                            <h4>{{ editedItem.estado }}</h4>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">
                            <v-btn color="purple darken-1" text @click="save">
                                `Lunes `
                            </v-btn>
                        </v-col>
                        <v-col cols="3">
                            <v-btn color="purple darken-1" text @click="save">
                                `Domingo `
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="verDoctor = false"
                        >
                            Cancel
                        </v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!---  MODAL CONFIRMAR DIAS --->
        <v-dialog
            transition="dialog-bottom-transition"
            max-width="500"
            v-model="modalDias"
        >
            <v-card>
                <v-card-title> Selecione los dias de trabajo </v-card-title>
                <v-card-text>
                    <v-container fluid>
                        <div class="row">
                            <div class="col-6">
                                <v-checkbox
                                    v-model="dias"
                                    label="Lunes"
                                    value="Lunes"
                                ></v-checkbox>
                                <v-checkbox
                                    v-model="dias"
                                    label="Martes"
                                    value="Martes"
                                ></v-checkbox>
                                <v-checkbox
                                    v-model="dias"
                                    label="Miercoles"
                                    value="Miercoles"
                                ></v-checkbox>
                                <v-checkbox
                                    v-model="dias"
                                    label="Jueves"
                                    value="Jueves"
                                ></v-checkbox>
                            </div>
                            <div class="col-6">
                                <v-checkbox
                                    v-model="dias"
                                    label="Viernes"
                                    value="Viernes"
                                ></v-checkbox>
                                <v-checkbox
                                    v-model="dias"
                                    label="Sabado"
                                    value="Sabado"
                                ></v-checkbox>
                                <v-checkbox
                                    v-model="dias"
                                    label="Domingo"
                                    value="Domingo"
                                ></v-checkbox>
                            </div>
                        </div>
                    </v-container>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="modalDias = false"
                        >
                            Cancelar
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="confirmarDias"
                        >
                            Confirmar
                        </v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog 
            transition="dialog-bottom-transition"
            max-width="1000"
            v-model="NuevoHorario"
        >
            <v-card>
                <v-card-text>
                    <v-row>
                        <v-col>
                            Elija el Horario
                            <v-select
                                :items="dias"
                                filled
                                label="Horario"
                                v-model="dia.diaKey"
                                item-value='key'
                            >
                                <template v-slot:selection="{ item }">
                                    {{ item.dia }} - {{ item.horaInicio }} - {{ item.horaFin }}
                                </template>
                                <template v-slot:item="{ item }">
                                    {{ item.dia }} - {{ item.horaInicio }} - {{ item.horaFin }}
                                </template>
                            
                            </v-select>
                        </v-col>
                    </v-row>
                    
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="NuevoHorario = false"
                        >
                            Cancelar
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="saveDiaDoctor()"
                        >
                            Confirmar
                        </v-btn>
                    </v-card-actions>
                    
                </v-card-text>
                
            </v-card>

        </v-dialog>
    </div>
</template>
<script src="./Doctores.js"></script>

<style scoped>
.table {
    border: solid 1px;
}
.azul {
    background-color: yellow;
}
.rojo {
    color: red;
}
</style>