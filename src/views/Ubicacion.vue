<template>
    <div>
        <br />
        <br />
        <center><h2>UBICACIÓN ESTRATÉGICA</h2></center>

        <p class="parrafo">
            Gracias a la ubicación estratégica de la Clínica Alemana, el
            servicio de emergencias es rápido y preciso, ya que nos encontramos
            a 10 minutos de la Zona Sur; a 7 minutos del Centro de la Ciudad; 7
            minutos de la zona de Miraflores; 7 minutos de la zona de alto
            Obrajes y alrededores y 12 minutos de la ciudad satélite (El Alto).
        </p>
        <div class="mapa">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4549.015234623485!2d-68.12177806829763!3d-16.513441260960054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f208aedaa362b%3A0x21c8ead9d8f0119a!2sCl%C3%ADnica%20Alemana!5e0!3m2!1ses!2sbo!4v1638303865043!5m2!1ses!2sbo"
                width="600"
                height="450"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
            ></iframe>
        </div>
    </div>
</template>

<script>
export default {
    name: "Ubicacion",
};
</script>

<style scoped>
.parrafo {
    margin: 30px 80px;
}
.mapa {
    display: flex;
    justify-content: center;
}
</style>
