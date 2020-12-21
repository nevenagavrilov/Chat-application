window.addEventListener('load', function () {

  //let conversation_history = {};

  fetch("json/conversations.json")
    .then(response => {
      //console.log(response.status)
      return response.json()
    })
    .then(conversation => {

      //conversation_history = conversation;
      //console.log(conversation_history);

      const active_conversation = document.getElementsByClassName('conversation');
      //console.log (active_conversation[2]);

      function active_conversation_function(element) {
        // 1. iz elementa izvuces osobu cija konverzacija ti treba
        // 2. na osnovu te osobe, u konverzacijama, nadjes odgovarajucu konverzaciju
        // 3. iscitas i ispises poruke

        const chat_div = document.getElementById("chat-message-list");
        chat_div.innerHTML = "";

        const elementId = element.target.id;
        console.log(elementId);      

        let conversation_number;
        for (let i = 0; i < conversation.length; i++) {
          if (elementId == conversation[i].name) {
            conversation_number = i;
            break;
          }
        }
        console.log(conversation_number);


        for (let i = 0; i < conversation[conversation_number].messages.length; i++) {
          //document.querySelector("#chat-message-list").innerText= conversation[0].messages[i].content

          if (conversation[conversation_number].messages[i].type == 'sent') {
            const sent_div = document.createElement('div');
            const sent_text = document.createTextNode(conversation[conversation_number].messages[i].content);

            sent_div.appendChild(sent_text);
            sent_div.classList.add("sent");
            sent_div.classList.add("message-row");
            console.log(sent_div.innerHTML);


            chat_div.appendChild(sent_div);
          }

          if (conversation[conversation_number].messages[i].type == 'received') {
            const received_div = document.createElement('div');
            const received_text = document.createTextNode(conversation[conversation_number].messages[i].content);

            received_div.appendChild(received_text);
            received_div.classList.add('received');
            received_div.classList.add('message-row');
            console.log(received_div.innerHTML);


            chat_div.appendChild(received_div);
          }
        }

      }

      for (let i = 0; i < conversation.length; i++) {
        active_conversation[i].addEventListener('click', active_conversation_function);
      }

    })

    .catch(error => {
      console.log("Greska pri ucitavanju konverzacija:")
      console.error(error)
    })


  //console.log('istorija konverzacije: ' +conversation_history.length);

  const button = document.getElementById("send_button");
  button.addEventListener('click', send_a_message);

  function send_a_message () {

    let newMessage = document.getElementById("new_message").value;

    if (newMessage == '') {
      return;
    }
    console.log(newMessage);

    const sent_div = document.createElement('div');
    const sent_text = document.createTextNode(newMessage);
    sent_div.appendChild(sent_text);
    sent_div.classList.add("sent");
    sent_div.classList.add("message-row");

    const chat_div = document.getElementById("chat-message-list");
    chat_div.appendChild(sent_div);


  };


}) 