<template>
    <v-list>
        <v-list-item v-for="item in alunos" :key="item">
            <v-container class="bg-surface-variant">
                <v-row no-gutters>
                    <v-col>
                        <v-sheet class="pa-2 ma-2">
                            name: {{ item }}
                        </v-sheet>
                    </v-col>

                    <v-col>
                        <v-sheet class="pa-2 ma-2">
                            Endereço:
                        </v-sheet>
                    </v-col>

                    <v-responsive width="100%"></v-responsive>

                    <v-col>
                        <v-sheet class="pa-2 ma-2">
                            Cpf Aluno:  
                        </v-sheet>
                    </v-col>

                    <v-col>
                        <v-sheet class="pa-2 ma-2">
                            Pai:
                        </v-sheet>
                    </v-col>
                    
                    <v-col>
                        <v-sheet class="pa-2 ma-2">
                            Cpf Pai:  
                        </v-sheet>
                    </v-col>

                    <v-col>
                        <v-sheet class="pa-2 ma-2">
                            Mãe:
                        </v-sheet>
                    </v-col>

                    <v-col>
                        <v-sheet class="pa-2 ma-2">
                            Cpf Mãe:  
                        </v-sheet>
                    </v-col>

                    
                    <v-responsive width="100%"></v-responsive>
                    
                    <v-col>
                        <v-sheet class="pa-2 ma-2">
                            Data de nascimento:
                        </v-sheet>
                    </v-col>

                    <v-col>
                        <v-sheet class="pa-2 ma-2">
                            Telefone:   
                        </v-sheet>
                    </v-col>
                    
                </v-row>
            </v-container>
        </v-list-item>
    </v-list>
</template>
<script>
export default {
    name: 'ShelfData',
    data: () => ({
        alunos: ['cloudless', 'Anderson', 'Kaique']
    })
}
</script>
<style scoped>
.v-sheet{
    word-break: break-all;
  white-space: break-word;

}
.v-container{
    padding: 0 !important;
}
.ma-2 {
    margin: 1px !important;
}
</style>