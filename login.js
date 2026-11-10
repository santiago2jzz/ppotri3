const tabLogin = document.querySelector("#tab-login");
const tabRegister = document.querySelector("#tab-register");
const loginForm = document.querySelector("#login-form");
const registerForm = document.querySelector("#register-form");
const title = document.querySelector("#form-title");
const subtitle = document.querySelector("#form-subtitle");

function mostrarFormulario(tipo) {
  const loginAtivo = tipo === "login";

  loginForm.hidden = !loginAtivo;
  registerForm.hidden = loginAtivo;
  tabLogin.classList.toggle("active", loginAtivo);
  tabRegister.classList.toggle("active", !loginAtivo);

  title.textContent = loginAtivo ? "Bem-vindo de volta" : "Crie sua conta";
  subtitle.textContent = loginAtivo
    ? "Entre com sua conta para continuar."
    : "Cadastre-se para acessar o F1 Race Companion.";
}

tabLogin.addEventListener("click", () => mostrarFormulario("login"));
tabRegister.addEventListener("click", () => mostrarFormulario("register"));

async function enviarFormulario(url, dados, mensagem, botao) {
  mensagem.textContent = "";
  botao.disabled = true;

  try {
    const resposta = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      mensagem.textContent = resultado.erro || "Não foi possível concluir a operação.";
      return false;
    }

    window.location.href = "/";
    return true;
  } catch (erro) {
    mensagem.textContent = "Não foi possível conectar ao servidor.";
    return false;
  } finally {
    botao.disabled = false;
  }
}

loginForm.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  await enviarFormulario(
    "/api/login",
    {
      usuario: loginForm.usuario.value.trim(),
      senha: loginForm.senha.value
    },
    document.querySelector("#login-message"),
    loginForm.querySelector("button[type='submit']")
  );
});

registerForm.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const mensagem = document.querySelector("#register-message");
  const senha = registerForm.senha.value;

  if (senha !== registerForm.confirmarSenha.value) {
    mensagem.textContent = "As senhas não coincidem.";
    return;
  }

  await enviarFormulario(
    "/api/cadastro",
    {
      usuario: registerForm.usuario.value.trim(),
      senha
    },
    mensagem,
    registerForm.querySelector("button[type='submit']")
  );
});
