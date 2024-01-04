<template>
    <div
        :style="{ 'width': '30%', 'display': 'flex', 'gap': '30px', 'margin': 'auto', 'margin-top': '50px', 'margin-bottom': '50px' }">
        <div
            :style="{ 'display': 'flex', 'flex-direction': 'column', 'align-items': 'center', 'width': 'max-content', 'margin': 'auto' }">
            <div :style="{ 'display': 'flex', 'flex-direction': 'column' }">
                <v-btn v-if="toggleHorary === true || toggleHorary === null" @click="toggleHorary = false"
                    class="rounded-0">Manhã</v-btn>
                <v-btn v-if="toggleHorary === false || toggleHorary === null" @click="toggleHorary = true"
                    class="rounded-0">Tarde</v-btn>
                <v-btn v-if="!toggleHorary === null || toggleHorary === true || toggleHorary === false"
                    @click="toggleHorary = null" class="rounded-0" variant="plain"
                    prepend-icon="mdi-close ">cancelar</v-btn>
            </div>
            <!-- <v-switch v-model="toggleHorary"
              :label="` Horário selecionado: ${toggleHorary !== null ? (toggleHorary ? 'Manhã' : 'Tarde') : 'Selecione um horário'}`"></v-switch> -->
        </div>
        <v-select chips variant="underlined" v-model="toggleClass"
            :items="['Infantil 1', 'Infantil 2', 'Infantil 3', 'Infantil 4', '1 Ano', '2 Ano', '3 Ano', '4 Ano', '5 Ano']"
            label="Selecione a(s) turma(s)" clearable multiple></v-select>
    </div>
    <v-textarea :style="{ 'width': '50%', 'margin': 'auto' }" @keydown.enter.prevent="searchName" label="Pesquise"
        v-model="studentNameSearching" placeholder="Digite o nome do(a) estudante" auto-grow variant="solo-inverted" rows="1"
        row-height="15"></v-textarea>
    <div :style="{ 'width': '50%', 'margin': 'auto' }">

        <span :style="{ 'font-size': 'small' }">Alunos encontrados: {{ studentsFound }}</span>
    </div>

    <v-expansion-panels :style="{ 'width': '50%', 'margin': 'auto' }">
        <v-expansion-panel v-for="student in $store.state.cloneStudents " :key="student.id">
            <v-expansion-panel-title><strong>nome: {{ student.name }}</strong></v-expansion-panel-title>
            <v-expansion-panel-text>
                <strong>ID:</strong> {{student?.id ? student.id : 'CAMPO VAZIO'}}
                <v-divider></v-divider>
                <strong>NOME:</strong> {{student?.name ? student.name : 'CAMPO VAZIO'}}
                <v-divider></v-divider>
                <strong>CPF DO ALUNO:</strong> {{student?.cpf  ? student.cpf : 'CAMPO VAZIO'}}
                <v-divider></v-divider>
                <strong>DATA DE NASCIMENTO:</strong> {{student?.birthday  ? student.birthday : 'CAMPO VAZIO'}}
                <v-divider></v-divider>
                <strong>TURMA:</strong> {{student?.class  ? student.class : 'CAMPO VAZIO'}}
                <v-divider></v-divider>
                <strong>HORÁRIO:</strong> {{student?.horary  ? student.horary : 'CAMPO VAZIO'}}
                <v-divider></v-divider>
                <strong>PAI:</strong> {{student?.father_name  ? student.father_name : 'CAMPO VAZIO'}}
                <v-divider></v-divider>
                <strong>CPF DO PAI:</strong> {{student?.father_cpf  ? student.father_cpf : 'CAMPO VAZIO'}}
                <v-divider></v-divider>
                <strong>TELEFONE DO PAI:</strong> {{student?.father_number  ? student.father_number : 'CAMPO VAZIO'}}
                <v-divider></v-divider>
                <strong>MÃE:</strong> {{student?.mother_name  ? student.mother_name : 'CAMPO VAZIO'}}
                <v-divider></v-divider>
                <strong>CPF DA MÃE:</strong> {{student?.mother_cpf  ? student.mother_cpf : 'CAMPO VAZIO'}}
                <v-divider></v-divider>
                <strong>TELEFONE DA MÃE:</strong> {{student?.mother_number  ? student.mother_number : 'CAMPO VAZIO'}}
                <v-divider></v-divider>
                <strong>ENDEREÇO:</strong> {{student?.address  ? student.address : 'CAMPO VAZIO'}}
                <v-divider></v-divider>


                <v-dialog v-model="dialogEdit" scrollable width="auto">
                    <template v-slot:activator="{ props }">
                        <v-btn variant="text" v-bind="props" @click="editStudentData(student)" icon="mdi-pencil"></v-btn>
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
                                                v-model="studentEdit.class">
                                            </v-select>
                                        </v-sheet>
                                    </v-col>
                                    <v-col>
                                        <v-sheet class="pa-2 ma-2">
                                            <v-select label="Selecione o horário" :items="['Matutino', 'Tarde']"
                                                v-model="studentEdit.horary">
                                            </v-select>
                                        </v-sheet>
                                    </v-col>
                                    <v-responsive width="100%"></v-responsive>
                                    <v-col>
                                        <v-sheet class="pa-2 ma-2">
                                            <v-text-field v-model="studentEdit.name" label="nome do aluno"></v-text-field>
                                        </v-sheet>
                                    </v-col>
                                    <v-responsive width="100%"></v-responsive>
                                    <v-col>
                                        <v-sheet class="pa-2 ma-2">
                                            <v-text-field v-model="studentEdit.cpf"
                                                label="cpf do aluno"></v-text-field>
                                        </v-sheet>
                                    </v-col>
                                    <v-col :style="{ 'display': 'flex', 'justify-content': 'center' }">
                                        <v-sheet class="pa-2 ma-2"
                                            :style="{ 'display': 'flex', 'justify-content': 'center' }">
                                            <input v-model="studentEdit.birthday" type="date" />
                                        </v-sheet>
                                    </v-col>
                                    <v-col>
                                        <v-sheet class="pa-2 ma-2">
                                            <v-text-field v-model="studentEdit.birth_locate"
                                                label="Local de nascimento:"></v-text-field>
                                        </v-sheet>
                                    </v-col>
                                    <v-responsive width="100%"></v-responsive>
                                    <v-col>
                                        <v-sheet class="pa-2 ma-2">
                                            <v-text-field v-model="studentEdit.father_name"
                                                label="nome do pai"></v-text-field>
                                        </v-sheet>
                                    </v-col>
                                    <v-responsive width="100%"></v-responsive>
                                    <v-col>
                                        <v-sheet class="pa-2 ma-2">
                                            <v-text-field v-model="studentEdit.father_cpf"
                                                label="cpf do pai"></v-text-field>
                                        </v-sheet>
                                    </v-col>

                                    <v-col>
                                        <v-sheet class="pa-2 ma-2">
                                            <v-text-field v-model="studentEdit.father_number"
                                                label="Telefone pai"></v-text-field>
                                        </v-sheet>
                                    </v-col>
                                    <v-responsive width="100%"></v-responsive>
                                    <v-col>
                                        <v-sheet class="pa-2 ma-2">
                                            <v-text-field v-model="studentEdit.mother_name"
                                                label="nome da mãe"></v-text-field>
                                        </v-sheet>
                                    </v-col>
                                    <v-responsive width="100%"></v-responsive>
                                    <v-col>
                                        <v-sheet class="pa-2 ma-2">
                                            <v-text-field v-model="studentEdit.mother_cpf"
                                                label="cpf da mãe"></v-text-field>
                                        </v-sheet>
                                    </v-col>
                                    <v-col>
                                        <v-sheet class="pa-2 ma-2">
                                            <v-text-field v-model="studentEdit.mother_number"
                                                label="Telefone mãe"></v-text-field>
                                        </v-sheet>
                                    </v-col>
                                    <v-responsive width="100%"></v-responsive>
                                    <v-col>
                                        <v-sheet class="pa-2 ma-2">
                                            <v-text-field v-model="studentEdit.address" label="Endereço"></v-text-field>
                                        </v-sheet>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions :style="{ 'display': 'flex', 'justify-content': 'flex-end' }">
                            <v-btn @click="dialogEdit = false" variant="plain" color="error">Cancelar</v-btn>
                            <v-btn type="submit" @click="registerEditStudent" variant="plain"
                                color="success">Adiconar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialog" persistent width="auto">
                    <template v-slot:activator="{ props }">
                        <v-btn variant="text" color="red-darken-1" v-bind="props" icon="mdi-delete"></v-btn>
                    </template>
                    <v-card>
                        <v-card-title class="text-h5">
                            Tem certeza?
                        </v-card-title>
                        <v-card-text>Após a remoção dos dados do estudante no banco de dados ele será
                            <strong>PERMANENTEMENTE PERDIDO</strong> no vazio dos dados excluídos</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red-darken-1" variant="plain" @click="afterConfirmNo()">
                                cancelar
                            </v-btn>
                            <v-btn color="green-darken-1" variant="text" @click="afterConfirmYes(student.id)">
                                aceitar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'ShelfData',
    // created(){
    //     this.studentsFound = this.$store.state.cloneStudents.length
    // },
    data: () => ({
        studentsFound: 0,
        dialog: false,
        dialogEdit: false,
        toggleHorary: null,
        toggleClass: null,
        studentNameSearching: '',
        new_Student: [],
        studentEdit: [],
    }),
    methods: {
        searchHorary() {
            this.$store.dispatch('searchHorary', this.toggleHorary)
        },
        searchClass() {
            this.$store.dispatch('searchClass', this.toggleClass)
        },
        searchName() {
            this.$store.dispatch('searchName', this.studentNameSearching)
        },
        editStudentData(data) {
            this.studentEdit = data
        },
        registerEditStudent() {
            this.$store.dispatch('waitEditStudent', this.studentEdit)
            this.new_Student = []
        },
        afterConfirmYes(data) {
            this.$store.dispatch('studentWaitDelete', data)
            this.dialog = false
        },
        afterConfirmNo() {
            this.studentWaitDelete = ''
            this.dialog = false
        },
    },
    watch: {
        toggleHorary() {
            this.$store.dispatch('searchHorary', this.toggleHorary)
        },
        toggleClass() {
            this.$store.dispatch('searchClass', this.toggleClass)
        },
        studentsList() {
            this.studentsFound = this.studentsList.length
        }
    },
    computed: {
        ...mapState({
            studentsList: state => state.cloneStudents
        })
    },
}
</script>
<style scoped>
:deep(.v-input__details) {
    min-height: 0 !important;
}

:deep(.v-messages) {
    min-height: 0 !important;
}

.v-container {
    display: flex;
}

.v-sheet {
    word-break: break-all;
    white-space: break-word;

}

.v-container {
    padding: 0 !important;
}

.ma-2 {
    margin: 1px !important;
}
</style>