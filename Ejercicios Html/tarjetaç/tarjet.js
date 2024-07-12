<form action="/procesar_pago" method="POST" id="payment-form">
  <input type="text" name="card_number" placeholder="Número de tarjeta de crédito" />
  <input type="text" name="expiry_date" placeholder="Fecha de caducidad (MM/AA)" />
  <input type="text" name="cvv" placeholder="CVV" />
  <button type="submit">Pagar</button>
</form>
<script src="https://js.stripe.com/v3/"></script>
<script>
var stripe = Stripe('TU_CLAVE_DE_API_PUBLICA');
var elements = stripe.elements();

var card = elements.create('card');

card.mount('#card-element');

document.getElementById('payment-form').addEventListener('submit', function(event) {
  event.preventDefault();

  stripe.createToken(card).then(function(result) {
    if (result.error) {
      console.error(result.error.message);
    } else {
      // Envía el token de pago al servidor para procesar el pago
      // result.token contiene el token de pago generado por Stripe
    }
  });
});
</script>
const stripe = require('stripe')('TU_CLAVE_DE_API_PRIVADA');

app.post('/procesar_pago', async (req, res) => {
  const token = req.body.stripeToken;

  const charge = await stripe.charges.create({
    amount: 1000, // Monto en centavos
    currency: 'usd',
    source: token,
    description: 'Prueba de pago',
  });

  // Aquí puedes realizar acciones adicionales después de procesar el pago
  res.send('Pago completado');
});
