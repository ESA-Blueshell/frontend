<template>
  <v-main>
    <top-banner title="Membership"></top-banner>

    <div class="mx-3">
      <div class="mx-auto" style="max-width: 800px">
        <div class="my-10">
          <p class="text-h4 font-weight-light">
            Interested in becoming a member?
          </p>

          <p class="body-1">
            You are definitely in the right place! If you are still unsure, be sure to check out the
            rest of our website, <a href="https://discord.gg/23YMFQy" target="_blank"
                                    class="text-decoration-none">Discord server</a>,
            and social media accounts to find out more about Blueshell Esports! By obtaining
            Blueshell
            membership you get:
          </p>
          <ul class="body-1">
            <li>Exclusive access to our members-only online or offline events;</li>
            <li>Special discounts in our events;</li>
            <li>Full member access to our official Discord server.</li>
          </ul>
          <p class="body-1">
            <br>
            Regular membership lasts for a year, starting from September 1st till August 31st of the
            following year. Furthermore, it is <b>not</b> required to have a Union Card in order to
            become a member of Blueshell.
          </p>
          <p class="body-1">
            Down below, you can find all the relevant information about becoming a member!
          </p>
        </div>
        <div class="my-10">
          <p class="text-h4 font-weight-light">
            How to become a member?
          </p>
          <p class="body-1">
            To become a member you first need to fill out the suitable membership form given below
            and
            send the filled out application form to the board via the mail
            <a href="mailto:board@blueshell.utwente.nl" class="text-decoration-none">
              board@blueshell.utwente.nl</a>:
          </p>
          <ul>
            <li>
              <a href="https://esa-blueshell.nl/api/download/Membership-form-UT-2022-2023.pdf"
                 target="_blank" class="text-decoration-none">
                For the University of Twente students</a></li>
            <li>
              <a href="https://esa-blueshell.nl/api/download/Membership-form-External-2022-2023.pdf"
                 target="_blank" class="text-decoration-none">
                For externals</a></li>
            <li>
              <a href="https://esa-blueshell.nl/api/download/Membership-form-Alumni-2022-2023.pdf"
                 target="_blank" class="text-decoration-none">
                For the alumni</a></li>
          </ul>
          <p class="body-1">
            <br>
            Afterward, you will be asked to pay the membership contribution which is elaborated on
            under the respective section.
          </p>
        </div>
        <div class="my-10">

          <p class="text-h4 font-weight-light">
            Contribution
          </p>
          <p>
            The membership fees for the academic year 2022/2023 are:
          </p>
          <ul>
            <li><b>€15</b> for a full year membership;</li>
            <li><b>€10</b> for a half-year membership*;</li>
            <li><b>€10</b> for an Alumni membership.</li>
          </ul>
          <p class="body-1">
            <br>
            *A half-year membership can only be obtained between the months of February and July.
          </p>
          <p class="body-1">
            The membership fee can be paid in cash or transferred to the bank account of Blueshell
            Esports (NL19 INGB 00080964 62 attn of Treasurer of Blueshell). Further details can be
            found on the membership form.

            Another option is via a
            <a href="https://esa-blueshell.nl/api/download/Direct_Debit_Mandate.pdf"
               target="_blank" class="text-decoration-none">
              Direct Debit Mandate</a>, allowing a one time or recurring payment by direct debit.
          </p>
        </div>
      </div>
    </div>
  </v-main>
</template>

<script>
import TopBanner from "@/components/top-banner";

export default {
  components: {TopBanner},
  data: function () {
    return {}
  }
}
</script>
