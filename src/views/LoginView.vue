
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
const router = useRouter()

const data = ref([]);

async function login() {
  const matricula = document.getElementById('matricula').value;
  const senha = document.getElementById('senha').value;

  try {
    const response = await fetch(`http://localhost:8080/usuarios/matricula/${matricula}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    let responseData = await response.json();
    data.value = responseData

    if (data.value.senha === senha) {
      router.push({ name: 'home' });
      localStorage.setItem('usuario', JSON.stringify(data.value));
    } else {
      Swal.fire({
        title: "Senha incorreta!",
        text: "A senha informada está incorreta. Digite sua senha e tente novamente.",
        icon: "error"
      });
    }
  } catch (error) {
    Swal.fire({
      title: "Usuário não encontrado!",
      text: "Nenhum usuário foi encontrado com a matrícula informada. Verifique se a matrícula está correta e tente novamente.",
      icon: "error"
    });
  }
}
</script>

<template>
    <div class="container-fluid bg-primary" style="user-select: none;">
        <div class="container d-flex flex-column align-items-center justify-content-center vh-100 bg-white">
            <img src="/src/assets/img/car.png" style="width: 15rem; height: 15rem;" alt="Carro">
            <h1>AutoStock Manager</h1>
            
            <div class="d-flex flex-column align-items-start justify-content-start gap-2 mb-4" style="margin: 1rem">
              <div class="form-floating">
                <input type="text" class="form-control" id="matricula" placeholder="Matrícula do usuário" maxlength="6">
                <label for="matricula">Matrícula do usuário</label>
              </div>
              <div class="form-floating">
                <input type="password" class="form-control" id="senha" placeholder="Senha" minlength="5">
                <label for="senha">Senha</label>
              </div>
            </div>
            <div class="d-flex flex-column gap-3 align-items-center justify-content-center">
              <button class="btn btn-primary" @click="login">Entrar</button>
              <router-link to="register">
                <button class="btn btn-primary">Registre-se</button>
              </router-link>
              <router-link to="forget-password">
                <span>Esqueceu sua senha?</span>
              </router-link>
            </div>
        </div>
    </div>
</template>