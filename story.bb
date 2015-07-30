#lang s-exp "baobab.rkt"

(info
    #:name "Homewards."
    #:author "Art Vandelay"
    #:description "A test story."
    #:start home)

(define-register health 10)
(define-register owns-dinosaur? #t)
(define-register is-raining? #f)

(define-scene home
    #:title
        "Your humble abode."
    #:description
        "You are at home, sweet home."
    (link 'walk
        #:text
            "Walk the dinosaur."
        [goto outside])
    (link* 'fire
        #:text
            "Set fire to the rain."
        #:present-if
            [reg is-raining?]
        
        [goto home] 
        ))

(define-scene outside
    #:title
        "You are outside."
    #:description
        "You are outside."
    (link 'a
        #:text
            "Go back inside"
        [if (> (random) 0.5)
            #t
            [do
                [[display "It gently begins to rain."]
                 [set is-raining? #t]]]]
        [goto home]))
