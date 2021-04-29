<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Produtos Front</a>
      </div>
    </nav>

    <div class="container">
      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          campo <b>{{ erro.field }}</b> - {{ erro.defaultMessage }}
        </li>
      </ul>

      <form @submit.prevent="salvar">
        <label>Nome</label>
        <input type="text" placeholder="Nome" v-model="funcionario.nome" />
        <label>Salario</label>
        <input
          type="number"
          placeholder="Salario"
          v-model="funcionario.salario"
        />

        <button class="waves-effect waves-light btn-small">
          Salvar<i class="material-icons left">save</i>
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>NOME</th>
            <th>SALARIO</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="funcionario of funcionarios" :key="funcionario.id">
            <td>{{ funcionario.nome }}</td>
            <td>{{ funcionario.salario }}</td>
            <td>
              <button
                @click="editar(funcionario)"
                class="waves-effect btn-small blue darken-1"
              >
                <i class="material-icons">create</i>
              </button>
              <button
                @click="remover(funcionario)"
                class="waves-effect btn-small red darken-1"
              >
                <i class="material-icons">delete_sweep</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Funcionario from "./services/funcionarios";

export default {
  data() {
    return {
      funcionario: {
        id: "",
        nome: "",
        salario: "",
      },
      funcionarios: [],
      errors: [],
    };
  },

  mounted() {
    this.listar();
  },

  methods: {
    listar() {
      Funcionario.listar().then((resposta) => {
        this.funcionarios = resposta.data;
      });
    },

    salvar() {
      if (!this.funcionario.id) {
        Funcionario.salvar(this.funcionario)
          .then(() => {
            this.funcionario = {};
            alert("Salvo com sucesso!");
            this.listar();
            this.errors = [];
          })
          .catch((e) => {
            this.errors = e.response.data.errors;
          });
      } else {
        Funcionario.atualizar(this.funcionario)
          .then(() => {
            this.funcionario = {};
            alert("Atualizado com sucesso!");
            this.listar();
            this.errors = [];
          })
          .catch((e) => {
            this.errors = e.response.data.errors;
          });
      }
    },

    editar(funcionario) {
      this.funcionario = funcionario;
    },

    remover(funcionario) {
      if (confirm("Deseja excluir o funcinario?")) {
        Funcionario.apagar(funcionario)
          .then(() => {
            this.listar();
            this.errors = [];
          })
          .catch((e) => {
            this.errors = e.response.data.errors;
          });
      }
    },
  },
};
</script>

<style>
</style>
