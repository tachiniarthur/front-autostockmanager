<template>
  <div class="d-flex justify-content-center align-items-center w-100 vh-100">
    <div class="col-10">
      <TituloPagina
        titulo="Gestão de usuários"
        link="/home"
      >
        <template v-slot:button>
          <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modal_cadastro">
            <i class="fa-solid fa-plus pe-2"></i>Adicionar usuário
          </button>
        </template>
      </TituloPagina>
      <hr>
      <div class="container-fluid" style="height: 40rem; overflow-y: scroll">
        <table class="table table-light table-striped table-hover">
          <thead>
            <tr>
              <th class="text-center">#</th>
              <th scope="col">Matricula</th>
              <th scope="col">Nome</th>
              <th scope="col">Email</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(usuario, index) in data" :key="usuario.id">
              <td class="text-center">{{ index + 1 }}</td>
              <td>{{ usuario.matricula }}</td>
              <td>{{ usuario.nome }}</td>
              <td>{{ usuario.email }}</td>
              <td><i :class="['fa-solid', usuario.ativo ? 'fa-check' : 'fa-xmark']"></i></td>
              <td>
                <div class="dropdown">
                  <button class="btn btn-outline-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    ...
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <button class="dropdown-item" @click="activateUser(usuario.id)">
                        <i :class="['fa-solid', usuario.ativo ? 'fa-xmark' : 'fa-check']"></i> Ativar/Inativar
                      </button>
                    </li>
                    <li>
                      <button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#modal_edicao" @click="fetchingUser(usuario.id)">
                        <i class="fa-solid fa-pen"></i> Editar
                      </button>
                    </li>
                    <li>
                      <button class="dropdown-item" @click="deleteUser(usuario.id)">
                        <i class="fa-solid fa-trash"></i> Excluir
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  
  <div class="modal fade" id="modal_cadastro" tabindex="-1" aria-labelledby="modal_cadastro" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal_cadastro"><i class="fa-solid fa-pen pe-2"></i>Criar novo usuário</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="d-flex flex-column gap-2">
            <div class="form-floating">
              <input type="email" class="form-control" id="matricula_criacao" placeholder="Matrícula do usuário" minlength="6" maxlength="6">
              <label for="matricula">Matrícula do usuário</label>
            </div>
            <div class="form-floating">
              <input type="number" class="form-control" id="cpf_criacao" placeholder="CPF do usuário" maxlength="11">
              <label for="cpf">CPF</label>
            </div>
            <div class="form-floating">
              <input type="password" class="form-control" id="senha_criacao" placeholder="Senha" minlenght="5">
              <label for="senha">Senha</label>
            </div>
            <div class="form-floating">
              <input type="password" class="form-control" id="confirmaSenha_criacao" placeholder="Confirme sua senha" minlenght="5">
              <label for="confirmaSenha">Confirme sua senha</label>
            </div>
            <div class="form-floating">
              <input type="nome" class="form-control" id="nome_criacao" placeholder="Nome completo">
              <label for="nome">Nome completo</label>
            </div>
            <div class="form-floating">
              <input type="email" class="form-control" id="email_criacao" placeholder="Email">
              <label for="email">Email</label>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="ativo_criacao">
              <label class="form-check-label" for="ativo">Ativo</label>
            </div>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-end">
          <button type="button" class="btn btn-outline-success" @click="createUser()">Salvar alterações<i class="fa-solid fa-pen ps-2"></i></button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="modal_edicao" tabindex="-1" aria-labelledby="modal_edicao" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal_edicao"><i class="fa-solid fa-pen pe-2"></i>Editar Usuário</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="d-flex flex-column gap-2">
            <div class="form-floating">
              <input type="text" class="form-control" id="matricula" placeholder="Matrícula do usuário">
              <label for="matricula">Matrícula do usuário</label>
            </div>
            <div class="form-floating">
              <input type="nome" class="form-control" id="nome" placeholder="Nome completo">
              <label for="nome">Nome completo</label>
            </div>
            <div class="form-floating">
              <input type="email" class="form-control" id="email" placeholder="Email">
              <label for="email">Email</label>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="ativo">
              <label class="form-check-label" for="ativo">Ativo</label>
            </div>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-between">
          <button type="button" class="btn btn-outline-danger" @click="deleteUser(idusuario)"><i class="fa-solid fa-trash pe-2"></i>Excluir</button>
          <button type="button" class="btn btn-outline-success" @click="updateUser(idusuario)">Salvar alterações<i class="fa-solid fa-pen ps-2"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TituloPagina from "../components/TituloPagina.vue";
import { onMounted, ref } from "vue";
import Swal from 'sweetalert2';

const data = ref([]);
const usuario = ref({});
const idusuario = ref(0);

onMounted(async () => {
  await listar();
});

async function listar() {
  try {
    const response = await fetch('http://localhost:8080/usuarios', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    let responseData = await response.json();
    data.value = responseData

  } catch (error) {
    console.error('Error fetching usuarios:', error);
  }
};

async function createUser() {
  const matricula = document.getElementById('matricula_criacao').value;
  const cpf = document.getElementById('cpf_criacao').value;
  const senha = document.getElementById('senha_criacao').value;
  const confirmaSenha = document.getElementById('confirmaSenha_criacao').value;
  const nomeCompleto = document.getElementById('nome_criacao').value;
  const email = document.getElementById('email_criacao').value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!matricula && cpf && !nomeCompleto && !email) {
    Swal.fire({
      title: "Erro ao cadastrar usuário!",
      text: "Verifique as informações e tente novamente.",
      icon: "error"
    });
    return;
  }
  
  if (!emailRegex.test(email)) {
    Swal.fire({
      title: "Erro ao cadastrar usuário!",
      text: "Endereço de email inválido. Por favor, verifique e tente novamente.",
      icon: "error"
    });
    return;
  }

  if (senha !== confirmaSenha) {
    Swal.fire({
      title: "Erro ao cadastrar usuário!",
      text: "Verifique se as senhas se coincidem e tente novamente.",
      icon: "error"
    });
    return;
  }

  const response = await fetch('http://localhost:8080/usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      matricula: matricula,
      cpf: cpf,
      senha: senha,
      nome: nomeCompleto,
      email: email,
    }),
  });

  if (response.ok) {
    Swal.fire({
      title: "Usuário cadastrado!",
      text: "Usuário cadastrado com sucesso!",
      icon: "success"
    }).then((result) => {
      listar();
    });
  } else {
    Swal.fire({
      title: "Erro!",
      text: "Erro ao cadastrar usuário!",
      icon: "danger"
    });
  }
}

function fetchingUser(id) {
  usuario.value = data.value.find((user) => user.id === id);

  idusuario.value = usuario.value.id;
  document.getElementById('matricula').value = usuario.value.matricula;
  document.getElementById('nome').value = usuario.value.nome;
  document.getElementById('email').value = usuario.value.email;
  document.getElementById('ativo').checked = usuario.value.ativo;
}

async function updateUser(id) {
  const matricula = document.getElementById('matricula').value;
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const ativo = document.getElementById('ativo').checked;

  const body = JSON.stringify({
    matricula,
    nome,
    email,
    ativo,
  });

  await fetch(`http://localhost:8080/usuarios/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  
  Swal.fire({
    title: "Usuário alterado!",
    text: "Usuário alterado com sucesso.",
    icon: "success"
  }).then(() => {
    listar();
  });
}

async function activateUser(id) {
  usuario.value = data.value.find((user) => user.id === id);
  const ativo = !usuario.value.ativo;

  const body = JSON.stringify({
    ativo,
  });

  await fetch(`http://localhost:8080/usuarios/status/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  Swal.fire({
    title: "Usuário alterado!",
    text: "Usuário ativado/inativado com sucesso.",
    icon: "success"
  }).then(() => {
    listar();
  });
}

function deleteUser(id) {
  fetch(`http://localhost:8080/usuarios/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  Swal.fire({
      title: "Usuário deletado!",
      text: "Usuário deletado com sucesso.",
      icon: "success"
    }).then(() => {
      listar();
  });
}

</script>