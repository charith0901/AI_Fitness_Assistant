"""add created_at column

Revision ID: 1f4a3eee3c90
Revises: 0f3a3eee2c80
Create Date: 2025-05-20 10:38:11.964116

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1f4a3eee3c90'
down_revision: str = '0f3a3eee2c80'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('fitness_data', sa.Column('created_at', sa.DateTime(), nullable=True, server_default=sa.func.now()))


def downgrade() -> None:
    op.drop_column('fitness_data', 'created_at')
