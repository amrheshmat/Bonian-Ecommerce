 function languageSwitcherEffects() {
    
    let direction = $('html').css('direction');
    let navigators = $('nav ul.sections');

    if (direction == 'rtl') {
        navigators.removeClass('mr-auto').addClass('ml-auto')
    } else {
        navigators.removeClass('ml-auto').addClass('mr-auto')
    }
    
}