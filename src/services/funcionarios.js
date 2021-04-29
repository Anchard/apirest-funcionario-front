import { http } from './config'

export default {

    listar: () => {
        return http.get('funcionarios')
    },

    salvar: (funcionario) => {
        return http.post('funcionario', funcionario)
    },

    atualizar: (funcionario) => {
        return http.put('funcionario', funcionario)
    },

    apagar: (funcionario) => {
        return http.delete('funcionario', { data: funcionario })
    }
}