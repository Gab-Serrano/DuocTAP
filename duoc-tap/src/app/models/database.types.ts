export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      asignatura: {
        Row: {
          id_asignatura: number
          id_carrera: number
          nom_asignatura: string
        }
        Insert: {
          id_asignatura?: number
          id_carrera: number
          nom_asignatura: string
        }
        Update: {
          id_asignatura?: number
          id_carrera?: number
          nom_asignatura?: string
        }
        Relationships: [
          {
            foreignKeyName: "asignatura_id_carrera_fkey"
            columns: ["id_carrera"]
            referencedRelation: "carrera"
            referencedColumns: ["id_carrera"]
          }
        ]
      }
      carrera: {
        Row: {
          id_carrera: number
          nom_carrera: string
        }
        Insert: {
          id_carrera?: number
          nom_carrera: string
        }
        Update: {
          id_carrera?: number
          nom_carrera?: string
        }
        Relationships: []
      }
      comuna: {
        Row: {
          id_comuna: number
          id_region: number
          nom_comuna: string
        }
        Insert: {
          id_comuna?: number
          id_region: number
          nom_comuna: string
        }
        Update: {
          id_comuna?: number
          id_region?: number
          nom_comuna?: string
        }
        Relationships: [
          {
            foreignKeyName: "comuna_id_region_fkey"
            columns: ["id_region"]
            referencedRelation: "region"
            referencedColumns: ["id_region"]
          }
        ]
      }
      detalle_estudiante: {
        Row: {
          id: string
          id_carrera: number
          id_jornada: number
        }
        Insert: {
          id: string
          id_carrera: number
          id_jornada: number
        }
        Update: {
          id?: string
          id_carrera?: number
          id_jornada?: number
        }
        Relationships: [
          {
            foreignKeyName: "detalle_estudiante_id_carrera_fkey"
            columns: ["id_carrera"]
            referencedRelation: "carrera"
            referencedColumns: ["id_carrera"]
          },
          {
            foreignKeyName: "detalle_estudiante_id_fkey"
            columns: ["id"]
            referencedRelation: "perfil"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "detalle_estudiante_id_fkey"
            columns: ["id"]
            referencedRelation: "perfil_detalle"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "detalle_estudiante_id_jornada_fkey"
            columns: ["id_jornada"]
            referencedRelation: "jornada"
            referencedColumns: ["id_jornada"]
          }
        ]
      }
      escuela: {
        Row: {
          id_escuela: number
          id_sede: number
          nom_escuela: string
        }
        Insert: {
          id_escuela?: number
          id_sede: number
          nom_escuela: string
        }
        Update: {
          id_escuela?: number
          id_sede?: number
          nom_escuela?: string
        }
        Relationships: [
          {
            foreignKeyName: "escuela_id_sede_fkey"
            columns: ["id_sede"]
            referencedRelation: "sede"
            referencedColumns: ["id_sede"]
          }
        ]
      }
      estado_asistencia: {
        Row: {
          descripcion: string
          id_estado: number
        }
        Insert: {
          descripcion: string
          id_estado?: number
        }
        Update: {
          descripcion?: string
          id_estado?: number
        }
        Relationships: []
      }
      estudiante_seccion: {
        Row: {
          id: string
          id_seccion: number
        }
        Insert: {
          id: string
          id_seccion: number
        }
        Update: {
          id?: string
          id_seccion?: number
        }
        Relationships: [
          {
            foreignKeyName: "estudiante_seccion_id_fkey"
            columns: ["id"]
            referencedRelation: "perfil"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estudiante_seccion_id_fkey"
            columns: ["id"]
            referencedRelation: "perfil_detalle"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estudiante_seccion_id_seccion_fkey"
            columns: ["id_seccion"]
            referencedRelation: "seccion"
            referencedColumns: ["id_seccion"]
          }
        ]
      }
      horario: {
        Row: {
          dia_semana: Database["public"]["Enums"]["week_day"]
          hora_fin: string
          hora_inicio: string
          id_horario: number
          id_seccion: number
          sala: string
        }
        Insert: {
          dia_semana: Database["public"]["Enums"]["week_day"]
          hora_fin: string
          hora_inicio: string
          id_horario?: number
          id_seccion: number
          sala: string
        }
        Update: {
          dia_semana?: Database["public"]["Enums"]["week_day"]
          hora_fin?: string
          hora_inicio?: string
          id_horario?: number
          id_seccion?: number
          sala?: string
        }
        Relationships: [
          {
            foreignKeyName: "horario_id_seccion_fkey"
            columns: ["id_seccion"]
            referencedRelation: "seccion"
            referencedColumns: ["id_seccion"]
          }
        ]
      }
      jornada: {
        Row: {
          descripcion: string
          id_jornada: number
        }
        Insert: {
          descripcion: string
          id_jornada?: number
        }
        Update: {
          descripcion?: string
          id_jornada?: number
        }
        Relationships: []
      }
      perfil: {
        Row: {
          apellido_materno: string | null
          apellido_paterno: string
          direccion: string
          dv_rut: string
          id: string
          id_comuna: number
          id_escuela: number
          id_rol: number
          id_sede: number | null
          num_rut: number
          primer_nombre: string
          segundo_nombre: string | null
          telefono: string
        }
        Insert: {
          apellido_materno?: string | null
          apellido_paterno: string
          direccion: string
          dv_rut: string
          id: string
          id_comuna: number
          id_escuela: number
          id_rol: number
          id_sede?: number | null
          num_rut: number
          primer_nombre: string
          segundo_nombre?: string | null
          telefono: string
        }
        Update: {
          apellido_materno?: string | null
          apellido_paterno?: string
          direccion?: string
          dv_rut?: string
          id?: string
          id_comuna?: number
          id_escuela?: number
          id_rol?: number
          id_sede?: number | null
          num_rut?: number
          primer_nombre?: string
          segundo_nombre?: string | null
          telefono?: string
        }
        Relationships: [
          {
            foreignKeyName: "perfil_id_comuna_fkey"
            columns: ["id_comuna"]
            referencedRelation: "comuna"
            referencedColumns: ["id_comuna"]
          },
          {
            foreignKeyName: "perfil_id_escuela_fkey"
            columns: ["id_escuela"]
            referencedRelation: "escuela"
            referencedColumns: ["id_escuela"]
          },
          {
            foreignKeyName: "perfil_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "perfil_id_rol_fkey"
            columns: ["id_rol"]
            referencedRelation: "rol"
            referencedColumns: ["id_rol"]
          },
          {
            foreignKeyName: "perfil_id_sede_fkey"
            columns: ["id_sede"]
            referencedRelation: "sede"
            referencedColumns: ["id_sede"]
          }
        ]
      }
      region: {
        Row: {
          id_region: number
          nom_region: string
        }
        Insert: {
          id_region?: number
          nom_region: string
        }
        Update: {
          id_region?: number
          nom_region?: string
        }
        Relationships: []
      }
      registro_asistencia: {
        Row: {
          id: string
          id_estado: number
          id_registro_asistencia: number
          id_sesion_clase: string
        }
        Insert: {
          id: string
          id_estado: number
          id_registro_asistencia?: number
          id_sesion_clase: string
        }
        Update: {
          id?: string
          id_estado?: number
          id_registro_asistencia?: number
          id_sesion_clase?: string
        }
        Relationships: [
          {
            foreignKeyName: "registro_asistencia_id_estado_fkey"
            columns: ["id_estado"]
            referencedRelation: "estado_asistencia"
            referencedColumns: ["id_estado"]
          },
          {
            foreignKeyName: "registro_asistencia_id_fkey"
            columns: ["id"]
            referencedRelation: "perfil"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registro_asistencia_id_fkey"
            columns: ["id"]
            referencedRelation: "perfil_detalle"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registro_asistencia_id_sesion_clase_fkey"
            columns: ["id_sesion_clase"]
            referencedRelation: "sesion_clase"
            referencedColumns: ["id_sesion_clase"]
          }
        ]
      }
      rol: {
        Row: {
          descripcion: string
          id_rol: number
        }
        Insert: {
          descripcion: string
          id_rol?: number
        }
        Update: {
          descripcion?: string
          id_rol?: number
        }
        Relationships: []
      }
      seccion: {
        Row: {
          anio: number
          id: string
          id_asignatura: number
          id_seccion: number
          nom_seccion: string
          semestre: number
        }
        Insert: {
          anio: number
          id: string
          id_asignatura: number
          id_seccion?: number
          nom_seccion: string
          semestre: number
        }
        Update: {
          anio?: number
          id?: string
          id_asignatura?: number
          id_seccion?: number
          nom_seccion?: string
          semestre?: number
        }
        Relationships: [
          {
            foreignKeyName: "seccion_id_asignatura_fkey"
            columns: ["id_asignatura"]
            referencedRelation: "asignatura"
            referencedColumns: ["id_asignatura"]
          },
          {
            foreignKeyName: "seccion_id_fkey"
            columns: ["id"]
            referencedRelation: "perfil"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seccion_id_fkey"
            columns: ["id"]
            referencedRelation: "perfil_detalle"
            referencedColumns: ["id"]
          }
        ]
      }
      sede: {
        Row: {
          direccion_sede: string
          id_comuna: number
          id_sede: number
          nom_sede: string
        }
        Insert: {
          direccion_sede: string
          id_comuna: number
          id_sede?: number
          nom_sede: string
        }
        Update: {
          direccion_sede?: string
          id_comuna?: number
          id_sede?: number
          nom_sede?: string
        }
        Relationships: [
          {
            foreignKeyName: "sede_id_comuna_fkey"
            columns: ["id_comuna"]
            referencedRelation: "comuna"
            referencedColumns: ["id_comuna"]
          }
        ]
      }
      sesion_clase: {
        Row: {
          esta_activa: boolean | null
          fecha_sesion_clase: string
          id_seccion: number
          id_sesion_clase: string
        }
        Insert: {
          esta_activa?: boolean | null
          fecha_sesion_clase: string
          id_seccion: number
          id_sesion_clase: string
        }
        Update: {
          esta_activa?: boolean | null
          fecha_sesion_clase?: string
          id_seccion?: number
          id_sesion_clase?: string
        }
        Relationships: [
          {
            foreignKeyName: "sesion_clase_id_seccion_fkey"
            columns: ["id_seccion"]
            referencedRelation: "seccion"
            referencedColumns: ["id_seccion"]
          }
        ]
      }
    }
    Views: {
      perfil_detalle: {
        Row: {
          carrera: string | null
          email: string | null
          escuela: string | null
          id: string | null
          id_rol: number | null
          nombre: string | null
          rut: string | null
          sede: string | null
        }
        Relationships: [
          {
            foreignKeyName: "perfil_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "perfil_id_rol_fkey"
            columns: ["id_rol"]
            referencedRelation: "rol"
            referencedColumns: ["id_rol"]
          }
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      week_day:
        | "Lunes"
        | "Martes"
        | "Miércoles"
        | "Jueves"
        | "Viernes"
        | "Sábado"
        | "Domingo"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}