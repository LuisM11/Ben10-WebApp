-- Insert Stats
INSERT INTO stats (id, speed, strength, agility, intelligence, durability, energy, combat_skill)
VALUES (1, 80, 70, 90, 60, 75, 100, 85)
    ON DUPLICATE KEY UPDATE speed=80, strength=70, agility=90, intelligence=60, durability=75, energy=100, combat_skill=85;

INSERT INTO stats (id, speed, strength, agility, intelligence, durability, energy, combat_skill)
VALUES (2, 100, 50, 100, 70, 60, 90, 80)
    ON DUPLICATE KEY UPDATE speed=100, strength=50, agility=100, intelligence=70, durability=60, energy=90, combat_skill=80;

-- Insert Aliens (Allow overwrites)
INSERT INTO aliens (id, name, description, image_url, stats_id)
VALUES (1, 'Heatblast', 'Fire alien with fire abilities', 'heatblast.png', 1)
    ON DUPLICATE KEY UPDATE name='Heatblast', description='Fire alien with fire abilities', image_url='heatblast.png', stats_id=1;

INSERT INTO aliens (id, name, description, image_url, stats_id)
VALUES (2, 'XLR8', 'Super speed alien', 'xlr8.png', 2)
    ON DUPLICATE KEY UPDATE name='XLR8', description='Super speed alien', image_url='xlr8.png', stats_id=2;


