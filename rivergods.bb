#lang s-exp "baobab.rkt"

(info
    #:name "We forgot the river gods."
    #:author "Joseph Parker"
    #:description "An adventure in 3 parts."
    #:start bank)

(define-register form "void")

(define-scene bank
    #:title
        "Among the reeds on the bank of the river."
    #:description
        "Cast off. Unwanted. Flotsom.  You can't put an exact world to it, but you understand why you are here, 
        floating among the reeds in the chilly muck"
    (link 'half-toad
        #:text
            "You are the forbidden offspring of woman and toad, left to die in the river of your father."
      ))
