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
        #:present-if
            [register-not-zero? owns-dinosaur?]
        [goto home])
    (link 'fire
        #:text
            "Set fire to the rain."
        #:present-if
            [register-not-zero? is-raining?]
        
        [goto home] 
        ))
