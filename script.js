/* 
CONTEÚDOS: 
useInterval, useTimeout, forms, promises, throttle, closures e callbacks 
*/

/* 
PASSOS:
1. [x]Enviar mensagem com nome de usuário ao clicar no enter/botão de envio
2. [x]Mensagens exibidas de baixo para cima
3. [x]Gerar mensagens aleatórias a cada 10 segundos
   > (Função generateRandomComment que retorna uma promise)
4. [x]Gerar uma mensagem aleatória 2 segundos após eu enviar uma mensagem
5. []Intervalo de 4 segundos para clicar no enter/botão de envio (Throttle - rate limiter)
*/


const user = "thali";
const chat = document.querySelector("#chat");
const messageInput = document.querySelector('#message-input');
const submitBtn = document.querySelector("#submit-btn");


// Função para exibir a mensagem no chat junto ao nome de usuário
function sendMessage(user, message) {
  if (message) {
    // Cria um novo elemento e classe para agrupar o username e a mensagem
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container");

      //Cria um novo elemento e classe para modificar o username
    const userElement = document.createElement("span");
    userElement.textContent = `${user}: `; //Exibe o usuário
    userElement.classList.add("user");

    if (user === 'thali') {
      userElement.style.color = '#eb62c9';  // Cor fixa para o meu username
    } else {
      userElement.style.color = generateRandomColor();  // Cor aleatória para os outros usuários
    }
    //Cria um novo elemento para a mensagem
    const messageElement = document.createElement("span");
    messageElement.textContent = message; //Exibe a mensagem

    //Adiciona os novos elementos ao chat
    chat.appendChild(userElement);
    chat.appendChild(messageElement);
    chat.appendChild(messageContainer);

    //Limpa o campo de input
    messageInput.value = ''; 
  };
};

  //Função para evento de clique para envio
function submit(event) {
  if (event.type =="click" || (event.type === "keydown" && event.key === "Enter")) {
    const message = messageInput.value.trim();
    sendMessage(user, message); 

    setTimeout(async () => {
      try {
        const {user, message} = await generateRandomComment();
        sendRandomMessage(user, message); // Envia a mensagem aleatória após 2 segundos
      } catch (error) {
        console.error("Erro ao gerar mensagem:", error);
      }
    }, 2000);
  }
}

//----
function throttle(func, delay) {
  let timeout = false;
 
  return (...args) => {
  if (timeout) return; 
  func(...args); 
  timeout = true
  setTimeout(() => { 
  timeout = false;
  }, delay);
  };
  }
 
  const throttleSubmit = throttle(() => submit(), 4000);
  submitBtn.addEventListener("click", () => {
  throttleSubmit()
  });
//---

//Gerar cores aleatórias para os usuários
function generateRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

// Gera comentário aleatório 
const generateRandomComment = () => {
  return new Promise((resolve) => {
    resolve({
      user: (Math.random() + 1).toString(36).slice(2, 7), 
      message: (Math.random() + 1).toString(36).slice(2, 7)});
  });
};

// Envio de mensagem aleatória
const sendRandomMessage = (user, message) => {
  sendMessage(user, message); // Envia a mensagem aleatória utilizando a mesma função de envio
};

  setInterval(async () => {
    try {
      const { user, message } = await generateRandomComment();
      sendRandomMessage(user, message); 
    } catch (error) {
      console.error("Erro ao gerar mensagem:", error);
    }
  }, 10000);


