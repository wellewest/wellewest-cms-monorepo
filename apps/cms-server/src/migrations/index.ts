import * as migration_20260508_081856_blocks_field from './20260508_081856_blocks_field';

export const migrations = [
  {
    up: migration_20260508_081856_blocks_field.up,
    down: migration_20260508_081856_blocks_field.down,
    name: '20260508_081856_blocks_field'
  },
];
