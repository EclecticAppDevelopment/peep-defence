
var waveMaps = [

{ 
 // WAVE 1
  enemies: [
{ count: 5,subwave_delay: 150, level: 1, type: 0, shield: 0, brutal: 0 },
{ count: 10,subwave_delay: 250, level: 1, type: 0, shield: 0, brutal: 0 }], wave_delay: 1000, alert_modal: 'Basic'},{ // WAVE 2
 enemies: [
{ count: 5,subwave_delay: 100, level: 2, type: 0, shield: 0, brutal: 0 },
{ count: 5,subwave_delay: 100, level: 3, type: 0, shield: 0, brutal: 0 },
{ count: 5,subwave_delay: 150, level: 3, type: 1, shield: 0, brutal: 0 }], wave_delay: 1000, alert_modal: 'Tank'},{ // WAVE 3
 enemies: [
{ count: 5,subwave_delay: 100, level: 2, type: 0, shield: 0, brutal: 0 },
{ count: 5,subwave_delay: 100, level: 3, type: 0, shield: 0, brutal: 0 },
{ count: 5,subwave_delay: 100, level: 4, type: 0, shield: 0, brutal: 0 },
{ count: 5,subwave_delay: 150, level: 4, type: 1, shield: 0, brutal: 0 }], wave_delay: 1000},{ // WAVE 4
 enemies: [
{ count: 5,subwave_delay: 100, level: 4, type: 0, shield: 0, brutal: 0 },
{ count: 5,subwave_delay: 100, level: 5, type: 0, shield: 0, brutal: 0 },
{ count: 10,subwave_delay: 150, level: 5, type: 1, shield: 0, brutal: 0 }], wave_delay: 1000},{ // WAVE 5
 enemies: [
{ count: 10,subwave_delay: 100, level: 5, type: 0, shield: 0, brutal: 0 },
{ count: 10,subwave_delay: 100, level: 6, type: 1, shield: 0, brutal: 0 },
{ count: 5,subwave_delay: 150, level: 6, type: 2, shield: 0, brutal: 0 }], wave_delay: 1000, alert_modal: 'Speeder'},{ // WAVE 6
 enemies: [
{ count: 5,subwave_delay: 100, level: 6, type: 0, shield: 0, brutal: 0 },
{ count: 5,subwave_delay: 100, level: 6, type: 1, shield: 0, brutal: 0 },
{ count: 5,subwave_delay: 150, level: 7, type: 2, shield: 0, brutal: 0 },
{ count: 10,subwave_delay: 150, level: 7, type: 1, shield: 0, brutal: 0 }], wave_delay: 1000},{ // WAVE 7
 enemies: [
{ count: 5,subwave_delay: 100, level: 7, type: 0, shield: 0, brutal: 0 },
{ count: 10,subwave_delay: 150, level: 8, type: 1, shield: 0, brutal: 0 },
{ count: 15,subwave_delay: 150, level: 8, type: 2, shield: 0, brutal: 0 }], wave_delay: 1000},{ // WAVE 8
 enemies: [
{ count: 10,subwave_delay: 100, level: 8, type: 0, shield: 0, brutal: 0 },
{ count: 10,subwave_delay: 100, level: 8, type: 1, shield: 0, brutal: 0 },
{ count: 5,subwave_delay: 150, level: 9, type: 2, shield: 0, brutal: 0 },
{ count: 5,subwave_delay: 100, level: 9, type: 1, shield: 10, brutal: 0 }], wave_delay: 1000, alert_modal: 'Shields'},{ // WAVE 9
 enemies: [
{ count: 10,subwave_delay: 100, level: 9, type: 0, shield: 0, brutal: 0 },
{ count: 5,subwave_delay: 150, level: 10, type: 1, shield: 10, brutal: 0 },
{ count: 20,subwave_delay: 150, level: 10, type: 2, shield: 0, brutal: 0 }], wave_delay: 1000},{ // WAVE 10
 enemies: [
{ count: 5,subwave_delay: 100, level: 10, type: 0, shield: 0, brutal: 0 },
{ count: 10,subwave_delay: 100, level: 10, type: 1, shield: 0, brutal: 0 },
{ count: 5,subwave_delay: 150, level: 11, type: 2, shield: 0, brutal: 0 },
{ count: 10,subwave_delay: 150, level: 11, type: 1, shield: 10, brutal: 0 },
{ count: 5,subwave_delay: 250, level: 10, type: 4, shield: 0, brutal: 0 }], wave_delay: 1000, alert_modal: 'Boss'},{ // WAVE 11
 enemies: [
{ count: 15,subwave_delay: 100, level: 11, type: 0, shield: 0, brutal: 0 },
{ count: 10,subwave_delay: 100, level: 12, type: 0, shield: 10, brutal: 0 },
{ count: 10,subwave_delay: 100, level: 12, type: 1, shield: 10, brutal: 0 }], wave_delay: 1000},{ // WAVE 12
 enemies: [
{ count: 10,subwave_delay: 150, level: 12, type: 0, shield: 0, brutal: 0 },
{ count: 10,subwave_delay: 150, level: 12, type: 2, shield: 0, brutal: 0 },
{ count: 5,subwave_delay: 150, level: 13, type: 3, shield: 0, brutal: 0 },
{ count: 15,subwave_delay: 150, level: 13, type: 1, shield: 10, brutal: 0 }], wave_delay: 1000, alert_modal: 'Air'},{ // WAVE 13
 enemies: [
{ count: 10,subwave_delay: 150, level: 13, type: 0, shield: 0, brutal: 0 },
{ count: 10,subwave_delay: 150, level: 14, type: 2, shield: 0, brutal: 0 },
{ count: 20,subwave_delay: 150, level: 14, type: 1, shield: 20, brutal: 0 }], wave_delay: 1000},{ // WAVE 14
 enemies: [
{ count: 10,subwave_delay: 150, level: 14, type: 0, shield: 0, brutal: 0 },
{ count: 15,subwave_delay: 150, level: 15, type: 2, shield: 0, brutal: 0 },
{ count: 20,subwave_delay: 150, level: 15, type: 1, shield: 20, brutal: 0 }], wave_delay: 1000},{ // WAVE 15
 enemies: [
{ count: 10,subwave_delay: 100, level: 15, type: 0, shield: 20, brutal: 0 },
{ count: 10,subwave_delay: 100, level: 15, type: 1, shield: 20, brutal: 0 },
{ count: 5,subwave_delay: 100, level: 16, type: 2, shield: 0, brutal: 0 },
{ count: 10,subwave_delay: 100, level: 16, type: 3, shield: 0, brutal: 0 },
{ count: 10,subwave_delay: 100, level: 16, type: 4, shield: 0, brutal: 0 }], wave_delay: 1000, alert_modal: 'Boss'},{ // WAVE 16
 enemies: [
{ count: 10,subwave_delay: 100, level: 16, type: 1, shield: 20, brutal: 0 },
{ count: 10,subwave_delay: 100, level: 16, type: 2, shield: 0, brutal: 0 },
{ count: 15,subwave_delay: 100, level: 17, type: 0, shield: 20, brutal: 0 },
{ count: 15,subwave_delay: 100, level: 17, type: 1, shield: 20, brutal: 0 }], wave_delay: 1000},{ // WAVE 17
 enemies: [
{ count: 10,subwave_delay: 150, level: 17, type: 0, shield: 0, brutal: 0 },
{ count: 10,subwave_delay: 150, level: 17, type: 2, shield: 0, brutal: 0 },
{ count: 5,subwave_delay: 150, level: 17, type: 3, shield: 0, brutal: 0 },
{ count: 10,subwave_delay: 150, level: 18, type: 2, shield: 20, brutal: 0 },
{ count: 15,subwave_delay: 150, level: 18, type: 1, shield: 20, brutal: 0 }], wave_delay: 1000, alert_modal: 'Shielded Speeder'},{ // WAVE 18
 enemies: [
{ count: 10,subwave_delay: 100, level: 18, type: 0, shield: 20, brutal: 0 },
{ count: 10,subwave_delay: 100, level: 18, type: 1, shield: 0, brutal: 0 },
{ count: 10,subwave_delay: 100, level: 19, type: 2, shield: 20, brutal: 0 },
{ count: 10,subwave_delay: 100, level: 19, type: 3, shield: 0, brutal: 0 },
{ count: 15,subwave_delay: 100, level: 19, type: 1, shield: 20, brutal: 0 }], wave_delay: 1000},{ // WAVE 19
 enemies: [
{ count: 10,subwave_delay: 150, level: 19, type: 0, shield: 20, brutal: 0 },
{ count: 15,subwave_delay: 150, level: 19, type: 2, shield: 0, brutal: 0 },
{ count: 10,subwave_delay: 150, level: 20, type: 3, shield: 0, brutal: 0 },
{ count: 10,subwave_delay: 150, level: 20, type: 2, shield: 20, brutal: 0 },
{ count: 10,subwave_delay: 150, level: 20, type: 1, shield: 20, brutal: 0 }], wave_delay: 1000},{ // WAVE 20
 enemies: [
{ count: 10,subwave_delay: 100, level: 20, type: 0, shield: 20, brutal: 0 },
{ count: 10,subwave_delay: 100, level: 20, type: 1, shield: 0, brutal: 0 },
{ count: 10,subwave_delay: 100, level: 21, type: 2, shield: 20, brutal: 0 },
{ count: 15,subwave_delay: 100, level: 21, type: 3, shield: 0, brutal: 0 },
{ count: 15,subwave_delay: 100, level: 21, type: 4, shield: 0, brutal: 0 }], wave_delay: 1000, alert_modal: 'Boss'},{ // WAVE 21
 enemies: [
{ count: 10,subwave_delay: 100, level: 21, type: 0, shield: 20, brutal: 0 },
{ count: 15,subwave_delay: 100, level: 21, type: 2, shield: 0, brutal: 0 },
{ count: 10,subwave_delay: 100, level: 22, type: 3, shield: 0, brutal: 0 },
{ count: 10,subwave_delay: 100, level: 22, type: 2, shield: 20, brutal: 0 },
{ count: 15,subwave_delay: 100, level: 22, type: 1, shield: 20, brutal: 0 }], wave_delay: 1000},{ // WAVE 22
 enemies: [
{ count: 10,subwave_delay: 100, level: 22, type: 0, shield: 20, brutal: 0 },
{ count: 15,subwave_delay: 100, level: 22, type: 1, shield: 0, brutal: 0 },
{ count: 15,subwave_delay: 100, level: 23, type: 2, shield: 20, brutal: 0 },
{ count: 15,subwave_delay: 100, level: 23, type: 3, shield: 0, brutal: 0 },
{ count: 10,subwave_delay: 100, level: 23, type: 3, shield: 20, brutal: 0 }], wave_delay: 1000, alert_modal: 'Shielded Air'},{ // WAVE 23
 enemies: [
{ count: 25,subwave_delay: 50, level: 22, type: 0, shield: 30, brutal: 0 },
{ count: 20,subwave_delay: 50, level: 22, type: 2, shield: 30, brutal: 0 },
{ count: 20,subwave_delay: 50, level: 22, type: 3, shield: 30, brutal: 0 }], wave_delay: 1000},{ // WAVE 24
 enemies: [
{ count: 20,subwave_delay: 100, level: 24, type: 1, shield: 30, brutal: 0 },
{ count: 15,subwave_delay: 100, level: 24, type: 2, shield: 0, brutal: 0 },
{ count: 15,subwave_delay: 100, level: 25, type: 0, shield: 30, brutal: 0 },
{ count: 15,subwave_delay: 100, level: 25, type: 3, shield: 0, brutal: 0 }], wave_delay: 1000},{ // WAVE 25
 enemies: [
{ count: 15,subwave_delay: 100, level: 26, type: 0, shield: 30, brutal: 0 },
{ count: 10,subwave_delay: 100, level: 25, type: 2, shield: 0, brutal: 0 },
{ count: 10,subwave_delay: 100, level: 25, type: 1, shield: 30, brutal: 0 },
{ count: 15,subwave_delay: 100, level: 26, type: 3, shield: 0, brutal: 0 },
{ count: 20,subwave_delay: 100, level: 26, type: 4, shield: 30, brutal: 0 }], wave_delay: 1000, alert_modal: 'Boss'},{ // WAVE 26
 enemies: [
{ count: 20,subwave_delay: 50, level: 27, type: 0, shield: 40, brutal: 0 },
{ count: 10,subwave_delay: 50, level: 27, type: 1, shield: 0, brutal: 0 },
{ count: 20,subwave_delay: 50, level: 27, type: 2, shield: 40, brutal: 0 },
{ count: 20,subwave_delay: 50, level: 27, type: 3, shield: 40, brutal: 0 }], wave_delay: 750},{ // WAVE 27
 enemies: [
{ count: 15,subwave_delay: 100, level: 28, type: 1, shield: 0, brutal: 0 },
{ count: 15,subwave_delay: 100, level: 28, type: 2, shield: 40, brutal: 0 },
{ count: 15,subwave_delay: 100, level: 28, type: 3, shield: 0, brutal: 0 },
{ count: 15,subwave_delay: 100, level: 28, type: 0, shield: 40, brutal: 1 },
{ count: 15,subwave_delay: 100, level: 28, type: 1, shield: 40, brutal: 0 }], wave_delay: 1000, alert_modal: 'Brutal Basic'},{ // WAVE 28
 enemies: [
{ count: 25,subwave_delay: 100, level: 29, type: 0, shield: 40, brutal: 1 },
{ count: 25,subwave_delay: 100, level: 29, type: 1, shield: 40, brutal: 0 },
{ count: 25,subwave_delay: 100, level: 29, type: 2, shield: 40, brutal: 0 }], wave_delay: 1000},{ // WAVE 29
 enemies: [
{ count: 20,subwave_delay: 50, level: 30, type: 0, shield: 40, brutal: 1 },
{ count: 20,subwave_delay: 50, level: 30, type: 2, shield: 40, brutal: 0 },
{ count: 20,subwave_delay: 50, level: 30, type: 1, shield: 40, brutal: 0 },
{ count: 15,subwave_delay: 50, level: 30, type: 3, shield: 40, brutal: 0 }], wave_delay: 500},{ // WAVE 30
 enemies: [
{ count: 15,subwave_delay: 100, level: 31, type: 0, shield: 50, brutal: 1 },
{ count: 10,subwave_delay: 100, level: 31, type: 1, shield: 50, brutal: 0 },
{ count: 10,subwave_delay: 100, level: 31, type: 2, shield: 50, brutal: 0 },
{ count: 20,subwave_delay: 100, level: 31, type: 3, shield: 0, brutal: 0 },
{ count: 25,subwave_delay: 100, level: 31, type: 4, shield: 50, brutal: 0 }], wave_delay: 1000, alert_modal: 'Boss'},{ // WAVE 31
 enemies: [
{ count: 80,subwave_delay: 50, level: 32, type: 2, shield: 20, brutal: 0 }], wave_delay: 1000},{ // WAVE 32
 enemies: [
{ count: 20,subwave_delay: 100, level: 33, type: 0, shield: 50, brutal: 0 },
{ count: 20,subwave_delay: 100, level: 33, type: 1, shield: 50, brutal: 1 },
{ count: 20,subwave_delay: 100, level: 33, type: 2, shield: 50, brutal: 0 },
{ count: 20,subwave_delay: 100, level: 33, type: 0, shield: 50, brutal: 0 }], wave_delay: 1000, alert_modal: 'Brutal Tanks'},{ // WAVE 33
 enemies: [
{ count: 10,subwave_delay: 100, level: 34, type: 1, shield: 50, brutal: 1 },
{ count: 20,subwave_delay: 100, level: 34, type: 0, shield: 50, brutal: 0 },
{ count: 10,subwave_delay: 100, level: 34, type: 2, shield: 50, brutal: 0 },
{ count: 20,subwave_delay: 100, level: 34, type: 3, shield: 50, brutal: 0 },
{ count: 20,subwave_delay: 100, level: 34, type: 1, shield: 50, brutal: 1 }], wave_delay: 500},{ // WAVE 34
 enemies: [
{ count: 80,subwave_delay: 50, level: 35, type: 3, shield: 50, brutal: 0 }], wave_delay: 1000},{ // WAVE 35
 enemies: [
{ count: 10,subwave_delay: 100, level: 36, type: 2, shield: 50, brutal: 0 },
{ count: 20,subwave_delay: 100, level: 36, type: 1, shield: 50, brutal: 1 },
{ count: 10,subwave_delay: 100, level: 36, type: 0, shield: 50, brutal: 0 },
{ count: 15,subwave_delay: 100, level: 36, type: 1, shield: 50, brutal: 1 },
{ count: 30,subwave_delay: 100, level: 36, type: 4, shield: 50, brutal: 0 }], wave_delay: 1000, alert_modal: 'Boss'},{ // WAVE 36
 enemies: [
{ count: 20,subwave_delay: 100, level: 37, type: 0, shield: 60, brutal: 0 },
{ count: 10,subwave_delay: 100, level: 37, type: 2, shield: 60, brutal: 0 },
{ count: 30,subwave_delay: 100, level: 37, type: 0, shield: 60, brutal: 1 },
{ count: 25,subwave_delay: 100, level: 37, type: 1, shield: 60, brutal: 1 }], wave_delay: 1000},{ // WAVE 37
 enemies: [
{ count: 20,subwave_delay: 100, level: 38, type: 0, shield: 60, brutal: 0 },
{ count: 25,subwave_delay: 100, level: 38, type: 1, shield: 60, brutal: 0 },
{ count: 20,subwave_delay: 50, level: 38, type: 2, shield: 60, brutal: 1 },
{ count: 20,subwave_delay: 50, level: 38, type: 2, shield: 60, brutal: 0 }], wave_delay: 500, alert_modal: 'Brutal Speeder'},{ // WAVE 38
 enemies: [
{ count: 25,subwave_delay: 100, level: 39, type: 0, shield: 60, brutal: 0 },
{ count: 30,subwave_delay: 100, level: 39, type: 2, shield: 60, brutal: 1 },
{ count: 30,subwave_delay: 100, level: 39, type: 0, shield: 60, brutal: 1 }], wave_delay: 1000},{ // WAVE 39
 enemies: [
{ count: 20,subwave_delay: 100, level: 40, type: 0, shield: 60, brutal: 0 },
{ count: 20,subwave_delay: 100, level: 40, type: 1, shield: 60, brutal: 1 },
{ count: 20,subwave_delay: 100, level: 40, type: 2, shield: 60, brutal: 1 },
{ count: 25,subwave_delay: 100, level: 40, type: 3, shield: 60, brutal: 0 }], wave_delay: 1000},{ // WAVE 40
 enemies: [
{ count: 25,subwave_delay: 100, level: 41, type: 1, shield: 60, brutal: 1 },
{ count: 30,subwave_delay: 100, level: 41, type: 2, shield: 60, brutal: 1 },
{ count: 35,subwave_delay: 100, level: 41, type: 4, shield: 60, brutal: 0 }], wave_delay: 1000},{ // WAVE 41
 enemies: [
{ count: 90,subwave_delay: 50, level: 42, type: 3, shield: 70, brutal: 0 }], wave_delay: 1000},{ // WAVE 42
 enemies: [
{ count: 25,subwave_delay: 100, level: 43, type: 0, shield: 70, brutal: 0 },
{ count: 15,subwave_delay: 100, level: 43, type: 1, shield: 70, brutal: 1 },
{ count: 20,subwave_delay: 100, level: 43, type: 2, shield: 70, brutal: 0 },
{ count: 30,subwave_delay: 100, level: 43, type: 3, shield: 70, brutal: 1 }], wave_delay: 1000, alert_modal: 'Brutal Air'},{ // WAVE 43
 enemies: [
{ count: 15,subwave_delay: 100, level: 44, type: 1, shield: 70, brutal: 1 },
{ count: 20,subwave_delay: 100, level: 44, type: 0, shield: 70, brutal: 0 },
{ count: 15,subwave_delay: 100, level: 44, type: 2, shield: 70, brutal: 1 },
{ count: 20,subwave_delay: 100, level: 44, type: 3, shield: 70, brutal: 1 },
{ count: 20,subwave_delay: 100, level: 44, type: 1, shield: 70, brutal: 1 }], wave_delay: 500},{ // WAVE 44
 enemies: [
{ count: 90,subwave_delay: 50, level: 45, type: 3, shield: 70, brutal: 1 }], wave_delay: 1000},{ // WAVE 45
 enemies: [
{ count: 10,subwave_delay: 100, level: 46, type: 2, shield: 80, brutal: 1 },
{ count: 10,subwave_delay: 100, level: 46, type: 1, shield: 80, brutal: 1 },
{ count: 15,subwave_delay: 100, level: 46, type: 0, shield: 80, brutal: 0 },
{ count: 20,subwave_delay: 100, level: 46, type: 1, shield: 80, brutal: 1 },
{ count: 40,subwave_delay: 100, level: 46, type: 4, shield: 80, brutal: 0 }], wave_delay: 1000, alert_modal: 'Boss'},{ // WAVE 46
 enemies: [
{ count: 20,subwave_delay: 100, level: 47, type: 0, shield: 80, brutal: 0 },
{ count: 20,subwave_delay: 100, level: 47, type: 2, shield: 80, brutal: 1 },
{ count: 30,subwave_delay: 100, level: 47, type: 0, shield: 80, brutal: 1 },
{ count: 25,subwave_delay: 100, level: 47, type: 1, shield: 80, brutal: 1 }], wave_delay: 250},{ // WAVE 47
 enemies: [
{ count: 25,subwave_delay: 100, level: 48, type: 0, shield: 90, brutal: 1 },
{ count: 25,subwave_delay: 100, level: 48, type: 1, shield: 90, brutal: 1 },
{ count: 25,subwave_delay: 50, level: 48, type: 2, shield: 90, brutal: 1 },
{ count: 20,subwave_delay: 50, level: 48, type: 2, shield: 90, brutal: 1 }], wave_delay: 500, alert_modal: 'Brutal Everything'},{ // WAVE 48
 enemies: [
{ count: 35,subwave_delay: 100, level: 49, type: 1, shield: 90, brutal: 1 },
{ count: 30,subwave_delay: 100, level: 49, type: 2, shield: 90, brutal: 1 },
{ count: 30,subwave_delay: 100, level: 49, type: 3, shield: 90, brutal: 1 }], wave_delay: 1000},{ // WAVE 49
 enemies: [
{ count: 20,subwave_delay: 50, level: 50, type: 0, shield: 50, brutal: 1 },
{ count: 20,subwave_delay: 50, level: 50, type: 1, shield: 50, brutal: 1 },
{ count: 30,subwave_delay: 50, level: 50, type: 2, shield: 50, brutal: 1 },
{ count: 25,subwave_delay: 50, level: 50, type: 3, shield: 50, brutal: 1 }], wave_delay: 250},{ // WAVE 50
 enemies: [
{ count: 15,subwave_delay: 100, level: 51, type: 1, shield: 50, brutal: 1 },
{ count: 10,subwave_delay: 100, level: 51, type: 0, shield: 50, brutal: 1 },
{ count: 25,subwave_delay: 100, level: 51, type: 4, shield: 50, brutal: 1 },
{ count: 10,subwave_delay: 100, level: 51, type: 2, shield: 50, brutal: 1 },
{ count: 25,subwave_delay: 100, level: 51, type: 4, shield: 50, brutal: 1 },
{ count: 10,subwave_delay: 50, level: 51, type: 3, shield: 50, brutal: 1 }], wave_delay: 250, alert_modal: 'Finale'}

 
];
