<template>
    <div :style="{ 'height': '15px' }"></div>
    <v-container :style="{ 'padding': '0' }" class="bg-surface-variant">
        <v-card :style="{ 'display': 'flex', 'justify-content': 'center' }">
            <v-card-title :style="{ 'font-weight': 'bolder' }">Cadastre um novo aluno</v-card-title>
        </v-card>
        <v-row :style="{ 'background-color': '#343748' }" no-gutters>
            <v-sheet width="300" class="mx-auto">
                <v-form fast-fail @submit.prevent>

                    <v-select label="Selecione a turma" :rules="selectRules"
                        :items="['infantil_1', 'infantil_2', 'infantil_3', 'infantil_4', '1_ano', '2_ano', '3_ano', '4_ano', '5_ano']"
                        v-model="new_Student.class">
                    </v-select>

                    <v-select label="Selecione o horário" :items="['Matutino', 'Tarde']" v-model="new_Student.horary">
                    </v-select>

                    <v-text-field v-model="new_Student.name" label="nome do aluno" :rules="firstNameRules"></v-text-field>

                    <v-text-field v-model="new_Student.student_cpf" label="cpf do aluno" :rules="CpfRules"></v-text-field>

                    <v-text-field v-model="new_Student.birth_date" label="Data de nascimento:"></v-text-field>

                    <v-text-field v-model="new_Student.father_name" label="nome do pai"></v-text-field>

                    <v-text-field v-model="new_Student.father_cpf" label="cpf do pai" :rules="CpfRules"></v-text-field>

                    <v-text-field v-model="new_Student.mother_name" label="nome da mãe"></v-text-field>

                    <v-text-field v-model="new_Student.mother_cpf" label="cpf da mãe" :rules="CpfRules"></v-text-field>

                    <v-text-field v-model="new_Student.address" label="Endereço"></v-text-field>

                    <v-text-field v-model="new_Student.father_number" label="Telefone pai"></v-text-field>

                    <v-text-field v-model="new_Student.mother_number" label="Telefone mãe"></v-text-field>

                    <v-btn type="submit" @click="registerNewStudent" block class="mt-2">Submit</v-btn>
                </v-form>
            </v-sheet>
        </v-row>
    </v-container>
</template>
<script>
export default {
    name: 'InsertWindow',
    data: () => ({
        new_Student: [],
        CpfRules: [
            value => {
                if (value?.length > 10 && value?.length < 12) return true

                return 'Um CPF contém 11 digitos'
            },
        ],
        selectRules: [
            {
                id: 'required',
                message: 'A turma é obrigatória'
            },
        ]
    }),
    methods: {
        registerNewStudent() {
            this.$store.dispatch('waitRegisterNewStudent', this.new_Student)
            this.new_Student = []
        }
    }
}
</script>
<style scoped>
.v-container {
    margin-top: 10px;
}

:deep(.v-row.v-row--no-gutters) {
    display: flex;
    flex-direction: column;
}

:deep(.v-input__details) {
    min-height: 0px !important;
    padding-top: 0px !important;
}

:deep(.v-messages) {
    min-height: 0px !important;
    min-width: 0px !important;
}
</style>