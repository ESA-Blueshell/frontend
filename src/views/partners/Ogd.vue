<template>
  <v-main>
    <top-banner title="OGD ICT-diensten"></top-banner>
    <div class="mx-3">
      <div class="mx-auto my-10" style="max-width: 800px">
        <v-img :src="require('../../assets/OGD.png')" max-width="450px" class="mb-6"></v-img>

        <p class="text-h4 font-weight-light">
          Wie zijn we?
        </p>
        <p class="body-1">
          OGD ict-diensten begon in 1987 als een groep van vijf studenten op een zolderkamer in
          Delft. Ict heette nog “automatisering,” Microsoft lanceerde Windows 2.0 en
          Google-oprichter Sergey Brin was een puistige puber. Als bijverdienste verwisselden ze
          geheugentapes van mainframes, toen nog onder de naam Operator Groep Delft. Tegenwoordig
          zijn we met meer dan duizend OGD’ers verspreid door heel het land. We hebben vestigingen
          in Amsterdam, Delft, Eindhoven, Enschede en Utrecht en houden ons bezig met ict in de
          breedste zin van het woord. Wij zijn altijd anders geweest. Mensen flexibel inzetten om
          problemen op te lossen, dat is onze kracht. Nog steeds, na ruim 25 jaar, blijven we trouw
          aan onszelf. Nog steeds zijn OGD’ers slimme, enthousiaste techneuten die strijden voor de
          perfecte werkplek, de hulpvaardigste servicedesk, de meest stabiele infrastructuur. Nog
          steeds hebben we een ongedwongen cultuur waarin iedereen zichzelf kan zijn. We stoppen
          niemand in een hokje.
        </p>
        <p class="text-h4 font-weight-light">
          Wat heb je als student aan OGD?
        </p>
        <p class="body-1">
          Bij OGD kun je heel breed worden ingezet, afhankelijk van je eigen vaardigheden en
          voorkeuren. We bieden bijbanen zoals bijvoorbeeld werkplekbeheerder, software-ontwikkelaar
          en helpdeskmedewerker (van eerste- tot derdelijns). Aan de hand van cursussen kun je
          jezelf ontwikkelen en zo ook steeds interessantere klussen gaan doen. Daarnaast is het
          best wel heel gezellig: veel uitjes, borrels en feesten! Na je afstuderen is er écht de
          mogelijkheid om door groeien: De volledige directie van OGD is begonnen met een bijbaan en
          samen met hen 61% van onze professionals. Ook krijg je de kans om je zelf te bepalen waar
          je naartoe wil groeien.
        </p>
        <p class="text-h4 font-weight-light">
          Vacatures
        </p>
        <p class="body-1">
          Alle: <a href="https://werkenbij.ogd.nl/vacature/student" class="text-decoration-none"
                   target="_blank">werkenbij.ogd.nl/vacature/student</a><br>
          Starter: <a href="https://werkenbij.ogd.nl/vacature/starter" class="text-decoration-none"
                      target="_blank">werkenbij.ogd.nl/vacature/starter</a>
        </p>
        <p class="text-h4 font-weight-light">
          Interesse?
        </p>
        <p class="body-1">
          Meer vragen over OGD ict-diensten of denk je aan stage lopen of een keertje kennismaken
          met OGD? Neemt contact op met het bestuur via:
          <a href="mailto:board@blueshell.utwente.nl" class="text-decoration-none">board@blueshell.utwente.nl</a>
          of zoek direct contact met OGD en mail je CV naar
          <a href="mailto:werken@ogd.nl" class="text-decoration-none">werken@ogd.nl</a>
          of bel gewoon even voor wat uitleg. Tot snel!
        </p>
      </div>
    </div>
  </v-main>
</template>

<script>
import TopBanner from "@/components/top-banner";

export default {
  name: "Ogd",
  components: {TopBanner}
}
</script>

<style scoped>

</style>