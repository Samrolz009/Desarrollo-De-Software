import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { AppService } from 'src/app/app.service';
import swal from 'sweetalert2';

@Component({
    selector: 'get_frontend',
    templateUrl: './get_pedagogicos.components.html'
})

export class GetPedagogicosComponent implements OnInit{
    public listado_pedagogicos:any[];
    public listado_codigo: any[];
    public listado_rendimiento: any[];
    public listado_dificultad: any[];
    public listado_facilidad: any[];
    public listado_estudio: any[];
    public listado_consideracion: any[];

    constructor(public service:AppService) {
        this.listado_pedagogicos = [];
    }

    public id;
    

    public pedagogico = {
        motivos:"",
        sexto_grado_cursado:"",
        ubicacion_centro_anterior:"",
        codigo_escuela:"",
        codigo_rendimiento:"",
        cod_asignatura_dificultad:"",
        cod_asignatura_facilidad:"",
        codigo_estudio:"",
        cod_consideracion:"",
        obs_reportes:"",
        obs_expulsion:"",
        obs_reprobado:""
    }

    ngOnInit(){
        this.get_pedagogicos();
        this.get_codigos();
        this.get_rendimiento();
        this.get_dificultad();
        this.get_facilidad();
        this.get_estudio();
        this.get_consideracion();
    }

    get_pedagogicos() {
        var response;
        this.service.get_pedagogicos().subscribe(
            data => response = data,
            err => {
                swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salio mal!',
                })
            },
            () => {
                this.listado_pedagogicos = response;
                console.log(response);
            }
        )
    }

    errores(){
        swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algun campo requerido esta vacio!',
        })
    }

    get_codigos() {
        var response;
        this.service.get_tipoescuela().subscribe(
            data => response = data,
            err => {
                this.listado_codigo = [];
            },
            () => {
                this.listado_codigo = response;
                console.log(response);
            }
        )
    }

    get_rendimiento() {
        var response;
        this.service.get_rendimientoacademico().subscribe(
            data => response = data,
            err => {
                this.listado_rendimiento = [];
            },
            () => {
                this.listado_rendimiento = response;
                console.log(response);
            }
        )
    }

    get_dificultad() {
        var response;
        this.service.get_dificultades().subscribe(
            data => response = data,
            err => {
                this.listado_dificultad = [];
            },
            () => {
                this.listado_dificultad = response;
                console.log(response);
            }
        )
    }

    get_facilidad() {
        var response;
        this.service.get_facilidades().subscribe(
            data => response = data,
            err => {
                this.listado_facilidad = [];
            },
            () => {
                this.listado_facilidad = response;
                console.log(response);
            }
        )
    }

    get_estudio() {
        var response;
        this.service.get_estudios().subscribe(
            data => response = data,
            err => {
                this.listado_estudio = [];
            },
            () => {
                this.listado_estudio = response;
                console.log(response);
            }
        )
    }

    get_consideracion() {
        var response;
        this.service.get_consideraciones().subscribe(
            data => response = data,
            err => {
                this.listado_consideracion = [];
            },
            () => {
                this.listado_consideracion = response;
                console.log(response);
            }
        )
    }

    insert_pedagogico(){
        var response;
        this.service.insert_pedagogico(this.pedagogico).subscribe(
        data => response = data,
        err => {
            swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salio mal!',
                })
        },
        ()=> {
            this.pedagogico = {
                motivos:"",
                sexto_grado_cursado:"",
                ubicacion_centro_anterior:"",
                codigo_escuela:"",
                codigo_rendimiento:"",
                cod_asignatura_dificultad:"",
                cod_asignatura_facilidad:"",
                codigo_estudio:"",
                cod_consideracion:"",
                obs_reportes:"",
                obs_expulsion:"",
                obs_reprobado:""
                }
                swal.fire({
                    title: 'Registro creado exitosamente!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
                
        this.get_pedagogicos();
        }
        );
    }

    delete_pedagogico(id){
        console.log("Registro a borrar: " + id);
        var response;
        var load={
        codigo_pedagogicos:id
        }
        swal.fire({
            title: 'Advertencia!',
            text: "Esta seguro desea borrar este registro?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                this.service.delete_pedagogico(load).subscribe(
                    data => response = data,
                    err => {
                        swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Algo salio mal!',
                        })
                    },
                    ()=> {
                        this.get_pedagogicos();
                    }
                    );
              swal.fire(
                'Borrado!',
                'El registro a sido borrado.',
                'success'
              )
            }
          })
        
    }




    update_pedagogico(){
        console.log("Registro a editar: " + this.id);
        var response;
        var load={
            codigo_pedagogicos:this.id
        };


        this.service.update_pedagogico(load, this.pedagogico).subscribe(
        data => response = data,
        err => {
            swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salio mal!',
            })
        },
        ()=> {
            this.pedagogico={
                motivos:"",
                sexto_grado_cursado:"",
                ubicacion_centro_anterior:"",
                codigo_escuela:"",
                codigo_rendimiento:"",
                cod_asignatura_dificultad:"",
                cod_asignatura_facilidad:"",
                codigo_estudio:"",
                cod_consideracion:"",
                obs_reportes:"",
                obs_expulsion:"",
                obs_reprobado:""
            };
            swal.fire({
                title: 'Registro actualizado exitosamente!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            this.get_pedagogicos();
        }
        );
        
    }

    pass_code(id) {
        this.id = id;
    }

    isShown: boolean = false ; // hidden by default


    toggleShow() {

    this.isShown = ! this.isShown;

    }
}