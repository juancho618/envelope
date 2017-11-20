app.controller('envelopeCtrl', function($window){
    let self = this;
    self.isOpen = false;
    self.dialog = false;

    self.start = () => {
        let env = angular.element( document.querySelector('#envelope'));
        env.addClass("animated bounceOutLeft");
        self.dialog = true;
    }

    self.counter = 0;
    self.extraPreg = ['Quien crees que esta detras de todo esto?', 'frase secreta'];
    self.extraRespuestas = ['juan', '5 minuticos mas']
    self.preguntas = [
        ['Nombre Completo?', 'Carrera que estudias?', 'Cuantos años vas a cumplir?','Soltera?'    ],
        ['Nombre de tu mascota?', 'Número de tatuajes?', 'Número de hermanos?'],
        ['Fruta favorita?', 'Comida favorita?', 'cocktail favorito']
    ];
    self.respuestas = [['Manuela Arboleda Pajoy', 'Arquitectura', '22', 'No'],
                        ['nica','5', '0'],
                        ['sandia', 'pescado', 'mojito']];
    self.ans = [];
    self.comentario = ['Comencemos por algo básico','Esta información ls puede tener cualquier persona',
                        'No te asustes estas mas cerca de tu regalo!'];
    self.errorMsg = ['Al parecer no puedes ni con los datos mas básicos!', 'No creo que ninguno de estos valores hayan cambiado desde la última vez que hablamos!', 'Son tres cosas que te gustan muchoooo!']
   self.successMeg = ['Muy bien! me has comprobado que por lo menos tienes acceso a su FB!', 'Eres una persona muy cercana a ella!', 'Definitivamente eres Manu!!!']

    self.submit = () => {
        let error = 0;
        if (self.ans[self.counter]){
            if (self.counter < 3) {        
           
            let skip = false
            self.respuestas[self.counter].forEach((r, index) => {

                if(self.counter == 0 && index == 3){
                        skip = true;
                    }       
                        if ( r.toLowerCase() != self.ans[self.counter][index].toLowerCase()){
                            if(!skip){
                                error --;
                                swal(
                                    'Oops...',
                                    self.errorMsg[self.counter],
                                    'error'
                                    )   
                            }
                            skip = false;
                                                
                        } else {
                            error ++;
                        }
                });
                if (error > 0){            
                    swal(
                        'Muy bien!',
                        self.successMeg[self.counter],
                        'success'
                        )  
                    self.counter ++;
                    error = 0;
                }
            } else {
                self.extraRespuestas.forEach((r, index) => {
                    if ( r.toLowerCase() != self.ans[self.counter][index].toLowerCase()){
                    error --;
                    swal(
                        'Oops...',
                        self.errorMsg[self.counter],
                        'error'
                        )  
                    } else{
                        error ++;
                    }
                })
                if (error > 0){            
                    swal(
                        'Muy bien!',
                        'perfecto',
                        'success'
                        )  
                        $window.location.href ='/cake';
                }
            }
        }else {
            swal(
                'No No No!',
                'Por lo menos intentalo!',
                'error'
                )   
        }
    };

});