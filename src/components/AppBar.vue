<template>
    <v-app-bar :style="{ 'display': 'flex', 'align-items': 'center' }">
        <v-app-bar-title>DB FMO<span :style="{ 'margin-left': '10px', 'font-size': '12px' }">Version
                1.0</span></v-app-bar-title>
        <v-switch inset color="info" v-model="darkMode" @change="toggleTheme()"
            :label="`Tema ${darkMode ? 'Escuro' : 'Claro'} ativo!`"></v-switch>
        <!-- <div class="theme-switch">
            <input type="checkbox" id="switch">
            <label for="switch" class="switch-label"></label>
        </div> -->
        <v-dialog v-model="dialog" scrollable width="auto">
            <template v-slot:activator="{ props }">
                <v-btn variant="text" v-bind="props" icon="mdi-plus"></v-btn>
            </template>
            <v-card>
                <v-card-title>Adiconar novo aluno</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: auto;">
                    <v-form ref="form" fast-fail @submit.prevent>
                        <v-row no-gutters>
                            <v-col>
                                <v-sheet class="pa-2 ma-2">
                                    <v-select label="Selecione a turma"
                                        :items="['infantil 1', 'infantil 2', 'infantil 3', 'infantil 4', '1 ano', '2 ano', '3 ano', '4 ano', '5 ano']"
                                        v-model="new_Student.class">
                                    </v-select>
                                </v-sheet>
                            </v-col>
                            <v-col>
                                <v-sheet class="pa-2 ma-2">
                                    <v-select label="Selecione o horário" :items="['Matutino', 'Tarde']"
                                        v-model="new_Student.horary">
                                    </v-select>
                                </v-sheet>
                            </v-col>
                            <v-responsive width="100%"></v-responsive>
                            <v-col>
                                <v-sheet class="pa-2 ma-2">
                                    <v-text-field v-model="new_Student.name" label="nome do aluno"></v-text-field>
                                </v-sheet>
                            </v-col>
                            <v-responsive width="100%"></v-responsive>
                            <v-col>
                                <v-sheet class="pa-2 ma-2">
                                    <v-text-field v-model="new_Student.student_cpf" label="cpf do aluno"></v-text-field>
                                </v-sheet>
                            </v-col>
                            <v-col :style="{ 'display': 'flex', 'justify-content': 'center' }">
                                <v-sheet class="pa-2 ma-2" :style="{ 'display': 'flex', 'justify-content': 'center' }">
                                    <input v-model="new_Student.birth_date" type="date" />
                                </v-sheet>
                            </v-col>
                            <v-col>
                                <v-sheet class="pa-2 ma-2">
                                    <v-text-field v-model="new_Student.birth_locate"
                                        label="Local de nascimento:"></v-text-field>
                                </v-sheet>
                            </v-col>
                            <v-responsive width="100%"></v-responsive>
                            <v-col>
                                <v-sheet class="pa-2 ma-2">
                                    <v-text-field v-model="new_Student.father_name" label="nome do pai"></v-text-field>
                                </v-sheet>
                            </v-col>
                            <v-responsive width="100%"></v-responsive>
                            <v-col>
                                <v-sheet class="pa-2 ma-2">
                                    <v-text-field v-model="new_Student.father_cpf" label="cpf do pai"></v-text-field>
                                </v-sheet>
                            </v-col>

                            <v-col>
                                <v-sheet class="pa-2 ma-2">
                                    <v-text-field v-model="new_Student.father_number" label="Telefone pai"></v-text-field>
                                </v-sheet>
                            </v-col>
                            <v-responsive width="100%"></v-responsive>
                            <v-col>
                                <v-sheet class="pa-2 ma-2">
                                    <v-text-field v-model="new_Student.mother_name" label="nome da mãe"></v-text-field>
                                </v-sheet>
                            </v-col>
                            <v-responsive width="100%"></v-responsive>
                            <v-col>
                                <v-sheet class="pa-2 ma-2">
                                    <v-text-field v-model="new_Student.mother_cpf" label="cpf da mãe"></v-text-field>
                                </v-sheet>
                            </v-col>
                            <v-col>
                                <v-sheet class="pa-2 ma-2">
                                    <v-text-field v-model="new_Student.mother_number" label="Telefone mãe"></v-text-field>
                                </v-sheet>
                            </v-col>
                            <v-responsive width="100%"></v-responsive>
                            <v-col>
                                <v-sheet class="pa-2 ma-2">
                                    <v-text-field v-model="new_Student.address" label="Endereço"></v-text-field>
                                </v-sheet>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions :style="{ 'display': 'flex', 'justify-content': 'flex-end' }">
                    <v-btn @click="dialog = false" variant="plain" color="error">Cancelar</v-btn>
                    <v-btn type="submit" @click="registerNewStudent" variant="plain" color="success">Adiconar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app-bar>
</template>
<script setup>
import { ref } from "vue";
import { useTheme } from "vuetify";

const theme = useTheme();
const darkMode = ref(true);

const toggleTheme = () => {
    theme.global.name.value = darkMode.value ? "dark" : "light";
    // Optional: Get value of current theme
    console.log(`Current theme is dark? ${theme.global.current.value.dark}`);
};
</script>
<script>
export default {
    name: 'AppBar',
    data: () => ({
        teste: false,
        toggleHorary: null,
        dialog: false,
        toggleClass: null,
        new_Student: [],
    }),
    methods: {
        async registerNewStudent() {
            const { valid } = await this.$refs.form.validate()
            if (!valid) {
                return
            }
            this.$store.dispatch('waitRegisterNewStudent', this.new_Student)
            this.new_Student = []
        },
    }
}
</script>
<style scoped>
:deep(.v-input__details) {
    min-height: 0 !important;
}

:deep(.v-messages) {
    min-height: 0 !important;
}

/* .theme-switch {
  position: relative;
}

.switch-label {
    display: block;
    width: 60px;
    height: 30px;
    background-color: #555;
    border-radius: 15px;
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s;
}

.switch-label:before {
  content: '☽'; Lua
  font-size: 24px;
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.3s, color 0.3s;
}

#switch:checked + .switch-label:before {
  content: '☀';
  color: #ffd700;
  transform: translate(-50%, -50%);
}  */
</style>


//caso eu precise rever algo


  <!-- <v-dialog v-model="dialog" persistent width="auto">
      <template v-slot:activator="{ props }">
          <v-btn variant="text" v-bind="props" icon="mdi-plus"></v-btn>
      </template>
      <v-row no-gutters>
          <v-sheet width="100%" class="mx-auto">
              <v-card :style="{ 'display': 'flex', 'justify-content': 'center' }">
                  <v-card-title :style="{ 'font-weight': 'bolder' }">Cadastre um novo aluno</v-card-title>
              </v-card>
              <v-form :style="{ 'height': '100%' }" ref="form" fast-fail @submit.prevent>
                  <v-card>
                      <v-row no-gutters>
                          <v-col>
                              <v-sheet class="pa-2 ma-2">
                                  <v-select label="Selecione a turma" :rules="selectRules"
                                      :items="['infantil 1', 'infantil 2', 'infantil 3', 'infantil 4', '1 ano', '2 ano', '3 ano', '4 ano', '5 ano']"
                                      v-model="new_Student.class">
                                  </v-select>
                              </v-sheet>
                          </v-col>
                          <v-col>
                              <v-sheet class="pa-2 ma-2">
                                  <v-select label="Selecione o horário" :items="['Matutino', 'Tarde']"
                                      v-model="new_Student.horary">
                                  </v-select>
                              </v-sheet>
                          </v-col>
                          <v-responsive width="100%"></v-responsive>
                          <v-col>
                              <v-sheet class="pa-2 ma-2">
                                  <v-text-field v-model="new_Student.name" label="nome do aluno"></v-text-field>
                              </v-sheet>
                          </v-col>
                          <v-responsive width="100%"></v-responsive>
                          <v-col>
                              <v-sheet class="pa-2 ma-2">
                                  <v-text-field v-model="new_Student.student_cpf" label="cpf do aluno"></v-text-field>
                              </v-sheet>
                          </v-col>
                          <v-col>
                              <v-sheet class="pa-2 ma-2">
                                  <v-text-field v-model="new_Student.birth_date"
                                      label="Data de nascimento:"></v-text-field>
                              </v-sheet>
                          </v-col>
                          <v-col>
                              <v-sheet class="pa-2 ma-2">
                                  <v-text-field v-model="new_Student.birth_locate"
                                      label="Local de nascimento:"></v-text-field>
                              </v-sheet>
                          </v-col>
                          <v-responsive width="100%"></v-responsive>
                          <v-col>
                              <v-sheet class="pa-2 ma-2">
                                  <v-text-field v-model="new_Student.father_name" label="nome do pai"></v-text-field>
                              </v-sheet>
                          </v-col>
                          <v-responsive width="100%"></v-responsive>
                          <v-col>
                              <v-sheet class="pa-2 ma-2">
                                  <v-text-field v-model="new_Student.father_cpf" label="cpf do pai"></v-text-field>
                              </v-sheet>
                          </v-col>
  
                          <v-col>
                              <v-sheet class="pa-2 ma-2">
                                  <v-text-field v-model="new_Student.father_number"
                                      label="Telefone pai"></v-text-field>
                              </v-sheet>
                          </v-col>
                          <v-responsive width="100%"></v-responsive>
                          <v-col>
                              <v-sheet class="pa-2 ma-2">
                                  <v-text-field v-model="new_Student.mother_name" label="nome da mãe"></v-text-field>
                              </v-sheet>
                          </v-col>
                          <v-responsive width="100%"></v-responsive>
                          <v-col>
                              <v-sheet class="pa-2 ma-2">
                                  <v-text-field v-model="new_Student.mother_cpf" label="cpf da mãe"></v-text-field>
                              </v-sheet>
                          </v-col>
                          <v-col>
                              <v-sheet class="pa-2 ma-2">
                                  <v-text-field v-model="new_Student.mother_number"
                                      label="Telefone mãe"></v-text-field>
                              </v-sheet>
                          </v-col>
                          <v-responsive width="100%"></v-responsive>
                          <v-col>
                              <v-sheet class="pa-2 ma-2">
                                  <v-text-field v-model="new_Student.address" label="Endereço"></v-text-field>
                              </v-sheet>
                          </v-col>
                          <v-responsive width="100%"></v-responsive>
                          <v-responsive width="100%"></v-responsive>
                          <v-col>
                              <v-sheet class="pa-2 ma-2">
                                  <v-btn type="submit" @click="registerNewStudent" variant="plain" block
                                      class="mt-2">Submit</v-btn>
                                  <v-btn @click="dialog = false" variant="plain" color="error" block>Cancel</v-btn>
                              </v-sheet>
                          </v-col>
                      </v-row>
                  </v-card>
  
              </v-form>
          </v-sheet>
      </v-row>
  </v-dialog> -->