-- Insert Stats
INSERT INTO stats (id, speed, strength, agility, intelligence, durability, energy, combat_skill) VALUES
    (1, 90, 60, 85, 50, 70, 80, 75)
    ON DUPLICATE KEY UPDATE speed=90, strength=60, agility=85, intelligence=50, durability=70, energy=80, combat_skill=75;

INSERT INTO stats (id, speed, strength, agility, intelligence, durability, energy, combat_skill) VALUES
    (2, 40, 95, 50, 60, 90, 70, 85)
    ON DUPLICATE KEY UPDATE speed=40, strength=95, agility=50, intelligence=60, durability=90, energy=70, combat_skill=85;

INSERT INTO stats (id, speed, strength, agility, intelligence, durability, energy, combat_skill) VALUES
    (3, 20, 30, 60, 100, 40, 50, 90)
    ON DUPLICATE KEY UPDATE speed=20, strength=30, agility=60, intelligence=100, durability=40, energy=50, combat_skill=90;

INSERT INTO stats (id, speed, strength, agility, intelligence, durability, energy, combat_skill) VALUES
    (4, 100, 40, 95, 70, 50, 80, 80)
    ON DUPLICATE KEY UPDATE speed=100, strength=40, agility=95, intelligence=70, durability=50, energy=80, combat_skill=80;

INSERT INTO stats (id, speed, strength, agility, intelligence, durability, energy, combat_skill) VALUES
    (5, 50, 70, 70, 90, 85, 90, 85)
    ON DUPLICATE KEY UPDATE speed=50, strength=70, agility=70, intelligence=90, durability=85, energy=90, combat_skill=85;

INSERT INTO stats (id, speed, strength, agility, intelligence, durability, energy, combat_skill) VALUES
    (6, 60, 80, 65, 55, 95, 70, 75)
    ON DUPLICATE KEY UPDATE speed=60, strength=80, agility=65, intelligence=55, durability=95, energy=70, combat_skill=75;

INSERT INTO stats (id, speed, strength, agility, intelligence, durability, energy, combat_skill) VALUES
    (7, 85, 55, 80, 65, 60, 75, 70)
    ON DUPLICATE KEY UPDATE speed=85, strength=55, agility=80, intelligence=65, durability=60, energy=75, combat_skill=70;

INSERT INTO stats (id, speed, strength, agility, intelligence, durability, energy, combat_skill) VALUES
    (8, 75, 65, 75, 60, 85, 85, 80)
    ON DUPLICATE KEY UPDATE speed=75, strength=65, agility=75, intelligence=60, durability=85, energy=85, combat_skill=80;

INSERT INTO stats (id, speed, strength, agility, intelligence, durability, energy, combat_skill) VALUES
    (9, 50, 90, 40, 50, 100, 65, 85)
    ON DUPLICATE KEY UPDATE speed=50, strength=90, agility=40, intelligence=50, durability=100, energy=65, combat_skill=85;

INSERT INTO stats (id, speed, strength, agility, intelligence, durability, energy, combat_skill) VALUES
    (10, 70, 85, 75, 55, 80, 90, 80)
    ON DUPLICATE KEY UPDATE speed=70, strength=85, agility=75, intelligence=55, durability=80, energy=90, combat_skill=80;

-- Insert Aliens
INSERT INTO aliens (id, name, description, image_url, stats_id, transformation_duration) VALUES
    (1, 'Bestia', 'Una criatura parecida a un felino con gran agilidad y sentido del olfato extremadamente desarrollado. Es rápida, sigilosa y puede ver en la oscuridad.',
     'https://mir-s3-cdn-cf.behance.net/project_modules/disp/0eb500163729347.63ed23682ee02.jpg', 1, 300)
    ON DUPLICATE KEY UPDATE name='Bestia', description='Una criatura parecida a un felino...', image_url='https://mir-s3-cdn-cf.behance.net/project_modules/disp/0eb500163729347.63ed23682ee02.jpg', transformation_duration=300;

INSERT INTO aliens (id, name, description, image_url, stats_id, transformation_duration) VALUES
    (2, 'Cuatrobrazos', 'Un alien rojo de gran tamaño con cuatro brazos musculosos. Es extremadamente fuerte y resistente, capaz de lanzar poderosos ataques físicos.',
     'https://mir-s3-cdn-cf.behance.net/project_modules/source/25b579163729347.63ed23682e37c.jpg', 2, 500)
    ON DUPLICATE KEY UPDATE name='Cuatrobrazos', description='Un alien rojo de gran tamaño...', image_url='https://mir-s3-cdn-cf.behance.net/project_modules/source/25b579163729347.63ed23682e37c.jpg', transformation_duration=500;

INSERT INTO aliens (id, name, description, image_url, stats_id, transformation_duration) VALUES
    (3, 'Materia Gris', 'Un alien de pequeño tamaño pero con una inteligencia sobrehumana. Puede analizar problemas complejos, hackear tecnología y escalar superficies con facilidad.',
     'https://mir-s3-cdn-cf.behance.net/project_modules/disp/97247b163729347.63ed23650ea8c.jpg', 3, 200)
    ON DUPLICATE KEY UPDATE name='Materia Gris', description='Un alien de pequeño tamaño...', image_url='https://mir-s3-cdn-cf.behance.net/project_modules/disp/97247b163729347.63ed23650ea8c.jpg', transformation_duration=200;

INSERT INTO aliens (id, name, description, image_url, stats_id, transformation_duration) VALUES
    (4, 'XLR8', 'Un velocista alienígena con la capacidad de moverse a velocidades extremas, reaccionar en fracciones de segundo y correr sobre cualquier superficie, incluso el agua.',
     'https://mir-s3-cdn-cf.behance.net/project_modules/disp/501e38163729347.63ed2364355b0.gif', 4, 150)
    ON DUPLICATE KEY UPDATE name='XLR8', description='Un velocista alienígena...', image_url='https://mir-s3-cdn-cf.behance.net/project_modules/disp/501e38163729347.63ed2364355b0.gif', transformation_duration=150;

INSERT INTO aliens (id, name, description, image_url, stats_id, transformation_duration) VALUES
    (5, 'Ultra-T', 'Un alien biomecánico con el poder de interactuar y controlar tecnología avanzada. Puede transformar partes de su cuerpo en herramientas y dispositivos electrónicos.',
     'https://mir-s3-cdn-cf.behance.net/project_modules/hd/a7870e163729347.63ed2363df75f.jpg', 5, 400)
    ON DUPLICATE KEY UPDATE name='Ultra-T', description='Un alien biomecánico...', image_url='https://mir-s3-cdn-cf.behance.net/project_modules/hd/a7870e163729347.63ed2363df75f.jpg', transformation_duration=400;

INSERT INTO aliens (id, name, description, image_url, stats_id, transformation_duration) VALUES
    (6, 'Diamante', 'Un alien con un cuerpo compuesto de cristal extremadamente resistente. Puede crear armas afiladas con su cuerpo y regenerar partes dañadas.',
     'https://mir-s3-cdn-cf.behance.net/project_modules/hd/78030c163729347.63ed2363deb8f.jpg', 6, 450)
    ON DUPLICATE KEY UPDATE description='Un alien con un cuerpo compuesto de cristal...', transformation_duration=450;

INSERT INTO aliens (id, name, description, image_url, stats_id, transformation_duration) VALUES
    (7, 'Insectoide', 'Un alien con características de insecto que le permiten volar y lanzar una sustancia pegajosa para atrapar a sus enemigos.',
     'https://mir-s3-cdn-cf.behance.net/project_modules/disp/c6e738163729347.63ed23650de06.jpg', 7, 350)
    ON DUPLICATE KEY UPDATE description='Un alien con características de insecto...', transformation_duration=350;

INSERT INTO aliens (id, name, description, image_url, stats_id, transformation_duration) VALUES
    (9, 'Cannonbolt', 'Un alien con un caparazón extremadamente duro, capaz de enrollarse en una bola y rodar a altas velocidades.',
     'https://mir-s3-cdn-cf.behance.net/project_modules/disp/685588163729347.63ed23648fd56.jpg', 8, 450)
    ON DUPLICATE KEY UPDATE description='Un alien con un caparazón extremadamente duro...', transformation_duration=450;

INSERT INTO aliens (id, name, description, image_url, stats_id, transformation_duration) VALUES
    (8, 'Acuático', 'Un alien anfibio capaz de respirar bajo el agua, nadar a gran velocidad y manipular el agua para crear ataques poderosos.',
     'https://mir-s3-cdn-cf.behance.net/project_modules/hd/85b7d5163729347.63ed236435f56.gif', 9, 400)
    ON DUPLICATE KEY UPDATE description='Un alien anfibio capaz de respirar bajo el agua...', transformation_duration=400;

INSERT INTO aliens (id, name, description, image_url, stats_id, transformation_duration) VALUES
    (10, 'Fuego', 'Un alien compuesto de fuego viviente, capaz de generar y lanzar llamas, resistir temperaturas extremas y volar usando propulsión de fuego.',
     'https://mir-s3-cdn-cf.behance.net/project_modules/disp/cd251d163729347.63ed236830edc.jpg', 10, 500)
    ON DUPLICATE KEY UPDATE description='Un alien compuesto de fuego viviente...', transformation_duration=500;

