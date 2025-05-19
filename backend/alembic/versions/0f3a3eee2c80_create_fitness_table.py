"""create_fitness_table

Revision ID: 0f3a3eee2c80
Revises: 
Create Date: 2025-05-19 16:38:11.964116

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0f3a3eee2c80'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.create_table(
        'fitness_data',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('age', sa.Integer()),
        sa.Column('gender', sa.Integer()),
        sa.Column('weight', sa.Float()),
        sa.Column('goal', sa.Integer()),
        sa.Column('activity_level', sa.Integer()),
        sa.Column('plan', sa.Integer())
    )

def downgrade():
    op.drop_table('fitness_data')

