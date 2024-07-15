<template>
  <div class="d-flex justify-content-center align-items-center w-100 vh-100">
    <div class="col-10">
      <TituloPagina
        titulo="Gestão de eventos"
        link="/home"
      >
        <template v-slot:button>
          <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modal_cadastro">
            <i class="fa-solid fa-plus pe-2"></i>Adicionar evento
          </button>
        </template>
      </TituloPagina>
      <hr>
      <div class="container-fluid" style="height: 40rem; overflow-y: scroll">
        <table class="table table-light table-striped table-hover">
          <thead>
            <tr>
              <th class="text-center">#</th>
              <th class="text-center">Nome</th>
              <th class="text-center">Local</th>
              <th class="text-center">Data</th>
              <th class="text-center">Descrição</th>
              <th class="text-center">Hora</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(evento, index) in data" :key="evento.id">
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">{{ evento.nome }}</td>
              <td class="text-center">{{ evento.local }}</td>
              <td class="text-center">{{ evento.data }}</td>
              <td class="text-center">{{ evento.descricao }}</td>
              <td class="text-center">{{ evento.hora }}</td>
              <td><i :class="['fa-solid', evento.ativo ? 'fa-check' : 'fa-xmark']"></i></td>
              <td>
                <div class="dropdown">
                  <button class="btn btn-outline-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    ...
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <button class="dropdown-item" @click="activateEvent(evento.id)">
                        <i :class="['fa-solid', evento.ativo ? 'fa-xmark' : 'fa-check']"></i> Ativar/Inativar
                      </button>
                    </li>
                    <li>
                      <button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#modal_edicao" @click="fetchingEvent(evento.id)">
                        <i class="fa-solid fa-pen"></i> Editar
                      </button>
                    </li>
                    <li>
                      <button class="dropdown-item" @click="deleteEvent(evento.id)">
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
          <h1 class="modal-title fs-5" id="modal_cadastro"><i class="fa-solid fa-pen pe-2"></i>Criar novo evento</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="d-flex flex-column gap-2">
            <div class="form-floating">
              <input type="text" class="form-control" id="nome_criacao" placeholder="Nome">
              <label for="nome">Nome</label>
            </div>
            <div class="form-floating">
              <input type="text" class="form-control" id="local_criacao" placeholder="Local">
              <label for="local">Local</label>
            </div>
            <div class="form-floating">
              <input type="date" class="form-control" id="data_criacao" placeholder="Data">
              <label for="data">Data</label>
            </div>
            <div class="form-floating">
              <input type="text" class="form-control" id="descricao_criacao" placeholder="Descrição">
              <label for="descricao">Descrição</label>
            </div>
            <div class="form-floating">
              <input type="time" class="form-control" id="hora_criacao" placeholder="Hora">
              <label for="hora">Hora</label>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="ativo_criacao">
              <label class="form-check-label" for="ativo">Ativo</label>
            </div>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-end">
          <button type="button" class="btn btn-outline-success" @click="createEvent()">Salvar alterações<i class="fa-solid fa-pen ps-2"></i></button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="modal_edicao" tabindex="-1" aria-labelledby="modal_edicao" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal_edicao"><i class="fa-solid fa-pen pe-2"></i>Editar Evento</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="d-flex flex-column gap-2">
            <div class="form-floating">
              <input type="text" class="form-control" id="nome" placeholder="Nome">
              <label for="nome">Nome</label>
            </div>
            <div class="form-floating">
              <input type="text" class="form-control" id="local" placeholder="Local">
              <label for="local">Local</label>
            </div>
            <div class="form-floating">
              <input type="date" class="form-control" id="data" placeholder="Data">
              <label for="data">Data</label>
            </div>
            <div class="form-floating">
              <input type="text" class="form-control" id="descricao" placeholder="Descrição">
              <label for="descricao">Descrição</label>
            </div>
            <div class="form-floating">
              <input type="time" class="form-control" id="hora" placeholder="Hora">
              <label for="hora">Hora</label>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="ativo">
              <label class="form-check-label" for="ativo">Ativo</label>
            </div>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-between">
          <button type="button" class="btn btn-outline-danger" @click="deleteEvent(idevento)"><i class="fa-solid fa-trash pe-2"></i>Excluir</button>
          <button type="button" class="btn btn-outline-success" @click="updateEvent(idevento)">Salvar alterações<i class="fa-solid fa-pen ps-2"></i></button>
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
const evento = ref({});
const idevento = ref(0);

onMounted(async () => {
  await listar();
});

async function listar() {
  try {
    const response = await fetch('http://localhost:8080/eventos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    let responseData = await response.json();
    data.value = responseData

  } catch (error) {
    console.error('Error fetching eventos:', error);
  }
};

async function createEvent() {
  const nome = document.getElementById('nome_criacao').value;
  const local = document.getElementById('local_criacao').value;
  const data = document.getElementById('data_criacao').value;
  const descricao = document.getElementById('descricao_criacao').value;
  const hora = document.getElementById('hora_criacao').value;
  const ativo = document.getElementById('ativo_criacao').checked;

  const response = await fetch('http://localhost:8080/eventos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nome,
      local,
      data,
      descricao,
      hora,
      ativo,
    }),
  });

  if (response.ok) {
    Swal.fire({
      title: "Evento cadastrado!",
      text: "Evento cadastrado com sucesso!",
      icon: "success"
    }).then((result) => {
      listar();
    });
  } else {
    Swal.fire({
      title: "Erro!",
      text: "Erro ao cadastrar evento!",
      icon: "danger"
    });
  }
}

function fetchingEvent(id) {
  evento.value = data.value.find((user) => user.id === id);

  idevento.value = evento.value.id;
  document.getElementById('nome').value = evento.value.nome;
  document.getElementById('local').value = evento.value.local;
  document.getElementById('data').value = evento.value.data;
  document.getElementById('descricao').value = evento.value.descricao;
  document.getElementById('hora').value = evento.value.hora;
  document.getElementById('ativo').checked = evento.value.ativo;
}

async function updateEvent(id) {
  const nome = document.getElementById('nome').value;
  const local = document.getElementById('local').value;
  const data = document.getElementById('data').value;
  const descricao = document.getElementById('descricao').value;
  const hora = document.getElementById('hora').value;
  const ativo = document.getElementById('ativo').checked;

  const body = JSON.stringify({
    nome,
    local,
    data,
    descricao,
    hora,
    ativo,
  });

  await fetch(`http://localhost:8080/eventos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  
  Swal.fire({
    title: "Evento alterado!",
    text: "Evento alterado com sucesso.",
    icon: "success"
  }).then(() => {
    listar();
  });
}

async function activateEvent(id) {
  evento.value = data.value.find((user) => user.id === id);
  const ativo = !evento.value.ativo;

  const body = JSON.stringify({
    ativo,
  });

  await fetch(`http://localhost:8080/eventos/status/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  Swal.fire({
    title: "Evento alterado!",
    text: "Evento ativado/inativado com sucesso.",
    icon: "success"
  }).then(() => {
    listar();
  });
}

function deleteEvent(id) {
  fetch(`http://localhost:8080/eventos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  Swal.fire({
      title: "Evento deletado!",
      text: "Evento deletado com sucesso.",
      icon: "success"
    }).then(() => {
      listar();
  });
}

</script>