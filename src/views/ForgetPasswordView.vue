
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
const router = useRouter()

const data = ref([]);
const formstatus = ref('fill-inputs');

async function verifyUser() {
    const matricula = document.getElementById('matricula').value;

    try {
        const response = await fetch(`http://localhost:8080/usuarios/matricula/${matricula}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        let responseData = await response.json();
        data.value = responseData;
        
        formstatus.value = 'fill-password';
    } catch (error) {
        Swal.fire({
            title: "Usuário não encontrado!",
            text: "Nenhum usuário foi encontrado com a matrícula informada. Verifique se a matrícula está correta e tente novamente.",
            icon: "error"
        });
    }
}

async function updatePassword() {
    const senha = document.getElementById('senha').value;
    const confirmaSenha = document.getElementById('confirmaSenha').value;

    if (senha !== confirmaSenha) {
        Swal.fire({
            title: "Erro ao cadastrar usuário!",
            text: "Verifique se as senhas se coincidem e tente novamente.",
            icon: "error"
        });
        return;
    }

    try {
        const responseUpdate = await fetch(`http://localhost:8080/usuarios/senha/${data.value.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: senha
        });
    
        let responseData = await responseUpdate.json();
        data.value = responseData;
        
        Swal.fire({
            title: "Senha atualiza com sucesso!",
            text: "Senha do usuário atualizada com sucesso!",
            icon: "success"
        }).then(() => {
            router.push({ name: 'login' });
        });
    } catch (error) {
        Swal.fire({
            title: "Erro ao atualizar senha do usuário!",
            text: "Ocorreu um erro ao atualizar a senha do usuário. Verifique a senha inserida e tente novamente.",
            icon: "error"
        });
    }
}
</script>

<template>
    <div class="container-fluid bg-primary" style="user-select: none;">
        <div class="container d-flex flex-column align-items-center justify-content-center vh-100 bg-white">
            <img src="/src/assets/img/car.png" style="width: 15rem; height: 15rem;" alt="Carro">
            <h1 class="mb-3">AutoStock Manager</h1>
            
            <div v-if="formstatus == 'fill-inputs'">
                <div class="d-flex flex-column align-items-center justify-content-center gap-2 mb-4" style="margin: 1rem">
                    <span class="fs-5 pb-2">Insira sua matrícula abaixo para trocar a senha do seu usuário</span>
                    <div class="form-floating">
                        <input type="text" class="form-control" id="matricula" placeholder="Matrícula do usuário" maxlength="6">
                        <label for="matricula">Matrícula do usuário</label>
                    </div>
                </div>
                <div class="d-flex flex-column gap-3 align-items-center justify-content-center">
                    <button class="btn btn-primary" @click="verifyUser">Verificar usuário</button>
                    <router-link to="/">
                        <span>Voltar para Login</span>
                    </router-link>
                </div>
            </div>
            <div v-else>
                <div class="d-flex flex-column align-items-center justify-content-center gap-2 mb-4" style="margin: 1rem">
                    <span class="fs-5 pb-2">Insira a senha desejada abaixo e confirme a mesma para trocar a senha do seu usuário</span>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="senha" placeholder="Senha" minlenght="5">
                        <label for="senha">Senha</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="confirmaSenha" placeholder="Confirme sua senha" minlenght="5">
                        <label for="confirmaSenha">Confirme sua senha</label>
                    </div>
                </div>
                <div class="d-flex flex-column gap-3 align-items-center justify-content-center">
                    <button class="btn btn-primary" @click="updatePassword">Troca senha</button>
                    <router-link to="/">
                        <span>Voltar para Login</span>
                    </router-link>
                </div>
            </div> 
        </div>
    </div>
</template>